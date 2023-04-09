package com.max.backend.controller.dto.request.create;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class CreateTaskRequestTest {

    private final CreateTicketRequest createTicketRequest = new CreateTicketRequest();


    @BeforeEach
    void setUp() {
        createTicketRequest.setTitle("name");
        createTicketRequest.setDescription("desc");
        createTicketRequest.setProjectId(1L);
        createTicketRequest.setProjectStatusId(1L);
        createTicketRequest.setPriorityId(1L);
        createTicketRequest.setExpiryDate(new Date());
    }


    @Test
    void testToString() {
        assertNotNull(createTicketRequest.toString());
    }
}
