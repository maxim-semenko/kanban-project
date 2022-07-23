package com.max.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class RestorePasswordRequest {

    @NotBlank(message = "email can't be empty")
    private String email;

    @NotNull(message = "emailCode can't be empty")
    private Integer emailCode;

    @NotBlank(message = "newPassword can't be blank")
    private String newPassword;
}
