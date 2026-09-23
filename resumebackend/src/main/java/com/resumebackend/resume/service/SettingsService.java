package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.UserSettingsReq;
import com.resumebackend.resume.dto.UserSettingsResponse;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.entity.UserSettings;
import com.resumebackend.resume.repository.UserRepository;
import com.resumebackend.resume.repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final UserSettingsRepository userSettingsRepository;
    private final UserRepository userRepository;


    public UserSettingsResponse getSettings(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSettings settings = userSettingsRepository.findByUser(user)
                .orElseGet(() -> createDefaultSettings(user));

        return mapToResponse(settings);
    }


    public UserSettingsResponse updateSettings(
            String email,
            UserSettingsReq req
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSettings settings = userSettingsRepository.findByUser(user)
                .orElseGet(() -> createDefaultSettings(user));

        settings.setDefaultTemplate(req.getDefaultTemplate());
        settings.setAccentColor(req.getAccentColor());
        settings.setTheme(req.getTheme());
        settings.setEmailNotifications(req.isEmailNotifications());
        settings.setResumeReminders(req.isResumeReminders());

        UserSettings savedSettings =
                userSettingsRepository.save(settings);

        return mapToResponse(savedSettings);
    }


    private UserSettings createDefaultSettings(User user) {

        UserSettings settings = new UserSettings();

        settings.setDefaultTemplate("Modern");
        settings.setAccentColor("blue");
        settings.setTheme("light");
        settings.setEmailNotifications(true);
        settings.setResumeReminders(false);
        settings.setUser(user);

        return userSettingsRepository.save(settings);
    }


    private UserSettingsResponse mapToResponse(UserSettings settings) {

        return new UserSettingsResponse(
                settings.getId(),
                settings.getDefaultTemplate(),
                settings.getAccentColor(),
                settings.getTheme(),
                settings.isEmailNotifications(),
                settings.isResumeReminders()
        );
    }
}