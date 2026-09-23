package com.resumebackend.resume.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordReq {

    private String token;
    private String newPassword;
}
