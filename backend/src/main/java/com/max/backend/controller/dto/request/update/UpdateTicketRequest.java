package com.max.backend.controller.dto.request.update;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
@ToString
public class UpdateTicketRequest {

    @Size(min = 2, max = 25)
    @NotBlank
    private String title;

    @Size(min = 2, max = 1024)
    @NotBlank
    private String description;

    @NotNull
    private Long priorityId;

    @NotNull
    private Date expiryDate;
}
