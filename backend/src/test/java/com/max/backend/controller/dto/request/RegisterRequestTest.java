package com.max.backend.controller.dto.request;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RegisterRequestTest {

    private final RegisterRequest registerRequest = new RegisterRequest();

    @BeforeEach
    void setUp() {
        registerRequest.setFirstname("f1");
        registerRequest.setLastname("l1");
        registerRequest.setEmail("e1");
        registerRequest.setSpeciality("s1");
        registerRequest.setPassword("12345678");
    }

    @Test
    void testToString() {
        assertNotNull(registerRequest.toString());
    }
}