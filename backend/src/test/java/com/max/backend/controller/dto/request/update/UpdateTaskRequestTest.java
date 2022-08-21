package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class UpdateTaskRequestTest {

    private final UpdateTaskRequest updateTaskRequest = new UpdateTaskRequest();

    @BeforeEach
    void setUp() {
        updateTaskRequest.setName("name");
        updateTaskRequest.setDescription("desc");
        updateTaskRequest.setPriorityId(1L);
        updateTaskRequest.setExpiryDate(new Date());
    }

    @Test
    void testToString() {
        assertNotNull(updateTaskRequest.toString());
    }
}