package com.max.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UpdateUserRolesRequest {
    private List<String> roles = new ArrayList<>();
}
