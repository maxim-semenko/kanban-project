package com.max.backend.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
public class RegisterRequest {

    @NotBlank
    @Size(min = 7, max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 256)
    private String password;

    @NotBlank
    @Size(min = 2, max = 50)
    private String firstname;

    @NotBlank
    @Size(min = 2, max = 50)
    private String lastname;

    @NotBlank
    @Size(min = 2, max = 50)
    private String speciality;
}
