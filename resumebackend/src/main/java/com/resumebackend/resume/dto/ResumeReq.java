package com.resumebackend.resume.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeReq {
@NotBlank(message="Fullname is required")
@Size(max=100,message= "Full name must not exceed 100 characters")
    private String fullName;

    @Size(max = 15, message = "Phone number must not exceed 15 characters")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message="Please enter a valid email")
    private String email;

    private String address;

    @Size(max = 2000, message = "Summary must not exceed 2000 characters")
    private String summary;
    @NotBlank(message="Job role is required")
    @Size(max=100,message= "Job role must not exceed 30 characters")
    private String jobRole;


}
