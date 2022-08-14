package com.max.backend.controller.dto.request.update;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserIsNonLockedRequest {
    private Boolean isNonLocked;
}