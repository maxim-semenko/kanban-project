package com.max.backend.controller.dto.response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MessageResponseTest {

    private final MessageResponse messageResponse
            = new MessageResponse("test");

    @Test
    void getMessage() {
        assertEquals("test", messageResponse.getMessage());
    }

    @Test
    void setMessage() {
        messageResponse.setMessage("test1");
        assertEquals("test1", messageResponse.getMessage());
    }

    @Test
    void testToString() {
        assertNotNull(messageResponse.toString());
    }
}