package com.max.backend.controller.dto.request.create;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class CreateTaskRequestTest {

    private final CreateTaskRequest createTaskRequest = new CreateTaskRequest();


    @BeforeEach
    void setUp() {
        createTaskRequest.setName("name");
        createTaskRequest.setDescription("desc");
        createTaskRequest.setProjectId(1L);
        createTaskRequest.setProjectStatusId(1L);
        createTaskRequest.setPriorityId(1L);
        createTaskRequest.setExpiryDate(new Date());
    }


    @Test
    void testToString() {
        assertNotNull(createTaskRequest.toString());
    }
}