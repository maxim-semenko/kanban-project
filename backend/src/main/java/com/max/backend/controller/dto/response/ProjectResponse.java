package com.max.backend.controller.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProjectResponse {

    private Long id;
    private String name;
    private String description;
    private Date createdDate;
    private String creator;

}
