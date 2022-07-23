package com.max.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserPasswordNotMatchesException extends RuntimeException {
    public UserPasswordNotMatchesException(String message) {
        super(message);
    }
}
