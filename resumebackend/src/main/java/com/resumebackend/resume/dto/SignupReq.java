package com.resumebackend.resume.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupReq {
    @NotBlank(message = "Name is required")
    private String name;
    @Email(message ="Email is required" )
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
    @NotBlank(message = "Confirm your password")
    private String confirmPassword;//do  ot add in user its just for checking not for storing

}
