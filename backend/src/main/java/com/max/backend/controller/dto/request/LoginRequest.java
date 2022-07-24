package com.max.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
public class LoginRequest {

    @NotBlank(message = "Email must be not blank!")
    @Size(min = 2, max = 30, message = "Email size must be between 2 and 30!")
    private String email;

    @NotBlank(message = "Password must be not blank!")
    @Size(min = 8, max = 255, message = "Password size must be between 8 and 255!")
    private String password;
}
