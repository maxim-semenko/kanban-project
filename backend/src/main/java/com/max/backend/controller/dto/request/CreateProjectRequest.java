package com.max.backend.controller.dto.request;

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
public class CreateProjectRequest {

    @Size(min = 2, max = 128)
    @NotBlank
    private String name;

    @Size(min = 2, max = 2048)
    @NotBlank
    private String description;

    @NotNull
    private Long creatorId;
    private List<User> members = new ArrayList<>();
    private List<String> tags = new ArrayList<>();
    private List<String> projectStatuses = new ArrayList<>();

}
