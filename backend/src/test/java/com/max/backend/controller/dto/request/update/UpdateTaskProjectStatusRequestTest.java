package com.max.backend.controller.dto.request.update;

import com.max.backend.entity.ProjectStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdateTaskProjectStatusRequestTest {

    private final UpdateTaskProjectStatusRequest updateTaskProjectStatusRequest = new UpdateTaskProjectStatusRequest();

    @BeforeEach
    void setUp() {
        updateTaskProjectStatusRequest.setProjectStatus(ProjectStatus.builder().build());
    }

    @Test
    void getProjectStatus() {
        assertNotNull(updateTaskProjectStatusRequest.getProjectStatus());
    }

    @Test
    void setProjectStatus() {
        updateTaskProjectStatusRequest.setProjectStatus(null);
        assertNull(updateTaskProjectStatusRequest.getProjectStatus());
    }
}