package com.max.backend.controller.dto.request.create;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
public class CreateProjectRequest {

    @Size(min = 2, max = 50)
    @NotBlank
    private String name;

    @Size(min = 2, max = 2048)
    @NotBlank
    private String description;

    @NotNull
    private Long creatorId;

}
