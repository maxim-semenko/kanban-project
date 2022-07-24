package com.max.backend.controller.dto.request;

import com.max.backend.entity.Tag;
import com.max.backend.entity.User;
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
    @Size(min = 2, max = 128)
    @NotBlank
    private String name;

    @Size(min = 2, max = 1024)
    @NotBlank
    private String description;

    @Size(min = 2, max = 50)
    @NotBlank
    private String priority;

    @NotNull
    private Long projectId;

    private List<Tag> tags = new ArrayList<>();

    private List<User> executors = new ArrayList<>();
}
