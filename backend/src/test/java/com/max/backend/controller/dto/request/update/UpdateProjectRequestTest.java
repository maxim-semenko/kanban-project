package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdateProjectRequestTest {

    private final UpdateProjectRequest updateProjectRequest = new UpdateProjectRequest();

    @BeforeEach
    void setUp() {
        updateProjectRequest.setName("Name");
        updateProjectRequest.setDescription("Description");
    }

    @Test
    void getName() {
        assertEquals("Name", updateProjectRequest.getName());
    }

    @Test
    void getDescription() {
        assertEquals("Description", updateProjectRequest.getDescription());

    }

    @Test
    void setName() {
        updateProjectRequest.setName("Name1");
        assertEquals("Name1", updateProjectRequest.getName());
    }

    @Test
    void setDescription() {
        updateProjectRequest.setDescription("Description1");
        assertEquals("Description1", updateProjectRequest.getDescription());
    }
}