package com.max.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ResourseForbiddenDeleteException extends RuntimeException {
    public ResourseForbiddenDeleteException(String message) {
        super(message);
    }
}
