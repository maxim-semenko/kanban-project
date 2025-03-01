package com.max.backend.controller.dto.request.update;

import com.max.backend.entity.ProjectStatus;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UpdateTicketProjectStatusRequest {
    @NotNull
    private ProjectStatus projectStatus;
}
