package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class UpdateTicketRequestTest {

    private final UpdateTicketRequest updateTicketRequest = new UpdateTicketRequest();

    @BeforeEach
    void setUp() {
        updateTicketRequest.setTitle("name");
        updateTicketRequest.setDescription("desc");
        updateTicketRequest.setPriorityId(1L);
        updateTicketRequest.setExpiryDate(new Date());
    }

    @Test
    void testToString() {
        assertNotNull(updateTicketRequest.toString());
    }
}
