package com.max.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectStatusException extends RuntimeException {
    public ProjectStatusException(String message) {
        super(message);
    }
}
