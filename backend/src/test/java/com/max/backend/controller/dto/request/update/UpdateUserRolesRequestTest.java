package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UpdateUserRolesRequestTest {

    private final UpdateUserRolesRequest updateUserRolesRequest = new UpdateUserRolesRequest();

    @BeforeEach
    void setUp() {
        updateUserRolesRequest.setRoles(List.of());
    }

    @Test
    void getRoles() {
        assertEquals(List.of(), updateUserRolesRequest.getRoles());
    }

    @Test
    void setRoles() {
        updateUserRolesRequest.setRoles(null);
        assertNull(updateUserRolesRequest.getRoles());
    }
}