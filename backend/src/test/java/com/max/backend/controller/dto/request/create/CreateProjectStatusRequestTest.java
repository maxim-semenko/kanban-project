package com.max.backend.controller.dto.request.create;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CreateProjectStatusRequestTest {

    private final CreateProjectStatusRequest createProjectStatusRequest = new CreateProjectStatusRequest();

    @BeforeEach
    void setUp() {
        createProjectStatusRequest.setName("test");
        createProjectStatusRequest.setLimitTotalTask(10L);
        createProjectStatusRequest.setProjectId(1L);
    }

    @Test
    void getName() {
        assertEquals("test", createProjectStatusRequest.getName());
    }

    @Test
    void getLimitTotalTask() {
        assertEquals(10L, createProjectStatusRequest.getLimitTotalTask());
    }

    @Test
    void getProjectId() {
        assertEquals(1L, createProjectStatusRequest.getProjectId());
    }

    @Test
    void setName() {
        createProjectStatusRequest.setName("test1");
        assertEquals("test1", createProjectStatusRequest.getName());
    }

    @Test
    void setLimitTotalTask() {
        createProjectStatusRequest.setLimitTotalTask(11L);
        assertEquals(11L, createProjectStatusRequest.getLimitTotalTask());

    }

    @Test
    void setProjectId() {
        createProjectStatusRequest.setProjectId(2L);
        assertEquals(2L, createProjectStatusRequest.getProjectId());
    }

    @Test
    void testToString() {
        assertNotNull(createProjectStatusRequest.toString());
    }
}