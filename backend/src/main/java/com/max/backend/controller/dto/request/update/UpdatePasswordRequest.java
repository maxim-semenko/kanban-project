package com.max.backend.controller.dto.request.update;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UpdatePasswordRequest {

    @NotBlank(message = "Old password may not be empty")
    @Size(min = 8, max = 255)
    private String oldPassword;

    @NotBlank(message = "New password may not be empty")
    @Size(min = 8, max = 255)
    private String newPassword;
}
