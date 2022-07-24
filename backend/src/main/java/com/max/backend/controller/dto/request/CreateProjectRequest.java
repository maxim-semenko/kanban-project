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
public class CreateProjectRequest {

    @Size(min = 2, max = 128)
    @NotBlank
    private String name;

    @Size(min = 2, max = 2048)
    @NotBlank
    private String description;

    @NotNull
    private Long creatorId;

    @Size(min = 1, max = 50)
    private List<Long> membersId = new ArrayList<>();

    private List<String> tags = new ArrayList<>();

    @Size(min = 1, max = 10)
    private List<String> projectStatuses = new ArrayList<>();

}
