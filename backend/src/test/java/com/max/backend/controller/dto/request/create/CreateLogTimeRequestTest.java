package com.max.backend.controller.dto.request.create;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class CreateLogTimeRequestTest {

    private final CreateLogTimeRequest createProjectRequest = new CreateLogTimeRequest();

    private Date startDate = new Date();
    private Date endDate = new Date();

    @BeforeEach
    void setUp() {
        createProjectRequest.setDescription("test");
        createProjectRequest.setStartDate(startDate);
        createProjectRequest.setEndDate(endDate);
        createProjectRequest.setTicketId(1L);
        createProjectRequest.setUserId(1L);
    }

    @Test
    void getDescription() {
        assertEquals("test", createProjectRequest.getDescription());
    }

    @Test
    void getStartDate() {
        assertEquals(startDate, createProjectRequest.getStartDate());
    }

    @Test
    void getEndDate() {
        assertEquals(endDate, createProjectRequest.getEndDate());
    }

    @Test
    void getTicketId() {
        assertEquals(1L, createProjectRequest.getTicketId());
    }


    @Test
    void getUserId() {
        assertEquals(1L, createProjectRequest.getUserId());
    }

    @Test
    void setDescription() {
        createProjectRequest.setDescription("test1");
        assertEquals("test1", createProjectRequest.getDescription());
    }

    @Test
    void setStartDate() {
        createProjectRequest.setStartDate(null);
        assertNull(createProjectRequest.getStartDate());
    }

    @Test
    void setEndDate() {
        createProjectRequest.setEndDate(null);
        assertNull(createProjectRequest.getEndDate());
    }

    @Test
    void setTicketId() {
        createProjectRequest.setTicketId(2L);
        assertEquals(2L, createProjectRequest.getTicketId());
    }

    @Test
    void setUserId() {
        createProjectRequest.setUserId(2L);
        assertEquals(2L, createProjectRequest.getUserId());
    }

}
