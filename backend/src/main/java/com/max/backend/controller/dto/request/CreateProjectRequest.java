package com.max.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class CreateProjectRequest {

    @Size(min = 2, max = 128)
    @NotBlank
    private String name;

    @Size(min = 2, max = 2048)
    @NotBlank
    private String description;

    @NotNull
    private Long creatorId;

//    @Size(min = 1, max = 50)
//    private List<Long> membersId = new ArrayList<>();

    @Size(min = 1, max = 10, message = "projectStatuses size must be between 1 and 10")
    private List<CreateProjectStatusRequest> projectStatuses = new ArrayList<>();

}
