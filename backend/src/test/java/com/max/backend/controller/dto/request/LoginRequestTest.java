package com.max.backend.controller.dto.request;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginRequestTest {

    private final LoginRequest loginRequest = new LoginRequest();

    @BeforeEach
    void setUp() {
        loginRequest.setEmail("email");
        loginRequest.setPassword("12345678");
    }

    @Test
    void testToString() {
        assertNotNull(loginRequest.toString());
    }
}