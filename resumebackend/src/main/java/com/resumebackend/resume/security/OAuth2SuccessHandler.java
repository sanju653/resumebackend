package com.resumebackend.resume.security;

import com.resumebackend.resume.entity.RefreshToken;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.repository.UserRepository;
import com.resumebackend.resume.service.RefreshTokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler
        implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oauthUser =
                (OAuth2User) authentication.getPrincipal();

        OAuth2AuthenticationToken oauthToken =
                (OAuth2AuthenticationToken) authentication;

        String registrationId =
                oauthToken.getAuthorizedClientRegistrationId();

        String email =
                oauthUser.getAttribute("email");

        String name =
                oauthUser.getAttribute("name");

        // GitHub may not provide email directly
        if ("github".equals(registrationId) && email == null) {

            OAuth2AuthorizedClient client =
                    authorizedClientService.loadAuthorizedClient(
                            registrationId,
                            oauthToken.getName()
                    );

            String githubAccessToken =
                    client.getAccessToken().getTokenValue();

            RestClient restClient = RestClient.create();

            List<Map<String, Object>> emails =
                    restClient.get()
                            .uri("https://api.github.com/user/emails")
                            .header(
                                    HttpHeaders.AUTHORIZATION,
                                    "Bearer " + githubAccessToken
                            )
                            .retrieve()
                            .body(
                                    new ParameterizedTypeReference<
                                            List<Map<String, Object>>>() {}
                            );

            if (emails != null) {

                // First try primary + verified email
                for (Map<String, Object> emailData : emails) {

                    Boolean primary =
                            (Boolean) emailData.get("primary");

                    Boolean verified =
                            (Boolean) emailData.get("verified");

                    if (Boolean.TRUE.equals(primary)
                            && Boolean.TRUE.equals(verified)) {

                        email =
                                (String) emailData.get("email");

                        break;
                    }
                }

                // If primary verified email wasn't found,
                // try any verified email
                if (email == null) {

                    for (Map<String, Object> emailData : emails) {

                        Boolean verified =
                                (Boolean) emailData.get("verified");

                        if (Boolean.TRUE.equals(verified)) {

                            email =
                                    (String) emailData.get("email");

                            break;
                        }
                    }
                }
            }
        }

        // Stop instead of creating a user with null email
        if (email == null || email.isBlank()) {
            throw new RuntimeException(
                    "Unable to get email from OAuth provider"
            );
        }

        // GitHub name can be null
        if (name == null || name.isBlank()) {

            name =
                    oauthUser.getAttribute("login");

        }

        // Find existing user or create a new one
        String finalName = name;
        String finalEmail = email;
        User user =
                userRepository.findByEmail(email)
                        .orElseGet(() -> {

                            User newUser =
                                    User.builder()
                                            .name(finalName)
                                            .email(finalEmail)
                                            .password(
                                                    passwordEncoder.encode(
                                                            UUID.randomUUID()
                                                                    .toString()
                                                    )
                                            )
                                            .build();

                            return userRepository.save(newUser);
                        });

        // Generate ResuMate JWT
        String accessToken =
                jwtService.generateToken(user.getEmail());

        // Generate ResuMate refresh token
        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);

        // Send tokens to React
        String redirectUrl =
                "http://localhost:5173/oauth2/success"
                        + "?accessToken=" + accessToken
                        + "&refreshToken="
                        + refreshToken.getToken();

        response.sendRedirect(redirectUrl);
    }
}