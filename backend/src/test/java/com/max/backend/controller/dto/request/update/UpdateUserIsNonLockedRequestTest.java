package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdateUserIsNonLockedRequestTest {

    private final UpdateUserIsNonLockedRequest updateUserIsNonLockedRequest = new UpdateUserIsNonLockedRequest();

    @BeforeEach
    void setUp() {
        updateUserIsNonLockedRequest.setIsNonLocked(true);
    }

    @Test
    void getIsNonLocked() {
        assertTrue(updateUserIsNonLockedRequest.getIsNonLocked());
    }

    @Test
    void setIsNonLocked() {
        updateUserIsNonLockedRequest.setIsNonLocked(false);
        assertFalse(updateUserIsNonLockedRequest.getIsNonLocked());
    }
}