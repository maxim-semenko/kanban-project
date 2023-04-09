package com.max.backend.controller.dto.request.update;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UpdateProjectStatusRequest {
    @NotNull
    @Size(min = 2, max = 15)
    private String name;

    @NotNull
    @Min(1)
    @Max(100)
    private Long limitTotalTicket;
}
