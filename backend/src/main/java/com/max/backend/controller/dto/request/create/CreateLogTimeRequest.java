package com.max.backend.controller.dto.request.create;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
public class CreateLogTimeRequest {

    @Size(min = 2, max = 1024)
    @NotBlank
    private String description;

    @NotNull
    private Long ticketId;

    @NotNull
    private Long userId;

    @NotNull
    private Date startDate;

    @NotNull
    private Date endDate;
}
