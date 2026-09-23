package com.resumebackend.resume.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SocialLinkResponse {

    private Long id;
    private String platform;
    private String url;
}