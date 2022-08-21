package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdateProjectStatusRequestTest {

    private final UpdateProjectStatusRequest updateProjectStatusRequest = new UpdateProjectStatusRequest();


    @BeforeEach
    void setUp() {
        updateProjectStatusRequest.setName("Name");
        updateProjectStatusRequest.setLimitTotalTask(10L);
    }

    @Test
    void getName() {
        assertEquals("Name", updateProjectStatusRequest.getName());
    }

    @Test
    void getLimitTotalTask() {
        assertEquals(10L, updateProjectStatusRequest.getLimitTotalTask());

    }

    @Test
    void setName() {
        updateProjectStatusRequest.setName("Name1");
        assertEquals("Name1", updateProjectStatusRequest.getName());

    }

    @Test
    void setLimitTotalTask() {
        updateProjectStatusRequest.setLimitTotalTask(9L);
        assertEquals(9L, updateProjectStatusRequest.getLimitTotalTask());
    }
}