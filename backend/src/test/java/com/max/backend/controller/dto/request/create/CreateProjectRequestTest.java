package com.max.backend.controller.dto.request.create;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CreateProjectRequestTest {

    private final CreateProjectRequest createProjectRequest = new CreateProjectRequest();


    @BeforeEach
    void setUp() {
        createProjectRequest.setName("name");
        createProjectRequest.setDescription("desc");
        createProjectRequest.setCreatorId(1L);
    }

    @Test
    void testToString() {
        assertNotNull(createProjectRequest.toString());
    }
}