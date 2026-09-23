package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.UserResponse;
import com.resumebackend.resume.dto.UserUpdateReq;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.UserRepository;
import com.resumebackend.resume.repository.UserSettingsRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final UserSettingsRepository userSettingsRepository;


    public UserResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getPhone(),
                user.getLocation());
    }

    public UserResponse updateMyProfile(UserUpdateReq userUpdateReq, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setName(userUpdateReq.getName());
        user.setEmail(userUpdateReq.getEmail());
        user.setPhone(userUpdateReq.getPhone());
        user.setLocation(userUpdateReq.getLocation());
        User updatedUser = userRepository.save(user);
        return new UserResponse(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail(), user.getPhone(),
                user.getLocation());

    }

    public void deleteMyAccount(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );
        userSettingsRepository.findByUser(user)
                .ifPresent(userSettingsRepository::delete);

        List<Resume> resumes = resumeRepository.findAllByUserId(user.getId());

        resumeRepository.deleteAll(resumes);

        userRepository.delete(user);
    }
}