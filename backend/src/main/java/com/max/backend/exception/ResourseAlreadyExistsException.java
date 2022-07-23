package com.max.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourseAlreadyExistsException extends RuntimeException {
    public ResourseAlreadyExistsException(String message) {
        super(message);
    }
}
