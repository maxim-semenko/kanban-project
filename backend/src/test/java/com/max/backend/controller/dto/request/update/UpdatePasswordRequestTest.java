package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdatePasswordRequestTest {

    private final UpdatePasswordRequest updatePasswordRequest = new UpdatePasswordRequest();

    @BeforeEach
    void setUp() {
        updatePasswordRequest.setOldPassword("12345678");
        updatePasswordRequest.setNewPassword("87654321");
    }

    @Test
    void getOldPassword() {
        assertEquals("12345678", updatePasswordRequest.getOldPassword());
    }

    @Test
    void getNewPassword() {
        assertEquals("87654321", updatePasswordRequest.getNewPassword());
    }

    @Test
    void setOldPassword() {
        updatePasswordRequest.setOldPassword("87654321");
        assertEquals("87654321", updatePasswordRequest.getOldPassword());

    }

    @Test
    void setNewPassword() {
        updatePasswordRequest.setNewPassword("12345678");
        assertEquals("12345678", updatePasswordRequest.getNewPassword());
    }
}