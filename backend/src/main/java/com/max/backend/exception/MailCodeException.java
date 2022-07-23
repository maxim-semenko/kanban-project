package com.max.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MailCodeException extends RuntimeException {
    public MailCodeException(String message) {
        super(message);
    }
}
