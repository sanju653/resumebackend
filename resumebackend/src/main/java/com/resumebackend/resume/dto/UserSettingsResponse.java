package com.resumebackend.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSettingsResponse {

    private Long id;

    private String defaultTemplate;

    private String accentColor;

    private String theme;

    private boolean emailNotifications;

    private boolean resumeReminders;
}