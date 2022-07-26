package com.max.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
public class CreateProjectStatusRequest {

    @NotNull
    @Size(min = 2, max = 15)
    private String name;

    @NotNull
    @Min(1)
    private Long limit;
}
