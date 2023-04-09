package com.max.backend.controller.dto.request.update;

import com.max.backend.entity.ProjectStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdateTicketProjectStatusRequestTest {

    private final UpdateTicketProjectStatusRequest updateTicketProjectStatusRequest = new UpdateTicketProjectStatusRequest();

    @BeforeEach
    void setUp() {
        updateTicketProjectStatusRequest.setProjectStatus(ProjectStatus.builder().build());
    }

    @Test
    void getProjectStatus() {
        assertNotNull(updateTicketProjectStatusRequest.getProjectStatus());
    }

    @Test
    void setProjectStatus() {
        updateTicketProjectStatusRequest.setProjectStatus(null);
        assertNull(updateTicketProjectStatusRequest.getProjectStatus());
    }
}