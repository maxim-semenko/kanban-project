package com.max.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ResourseForbiddenException extends RuntimeException {
    public ResourseForbiddenException(String message) {
        super(message);
    }
}
