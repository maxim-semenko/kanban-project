package com.max.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CreateTaskRequest {
    @Size(min = 2, max = 15)
    @NotBlank
    private String name;

    @Size(min = 2, max = 1024)
    @NotBlank
    private String description;

    @NotBlank
    private String priority;

    @NotNull
    private Long projectId;
    
}
