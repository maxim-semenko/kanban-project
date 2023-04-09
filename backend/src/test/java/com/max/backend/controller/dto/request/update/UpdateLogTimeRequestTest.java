package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class UpdateLogTimeRequestTest {

    private final UpdateLogTimeRequest updateLogTimeRequest = new UpdateLogTimeRequest();

    private Date startDate = new Date();
    private Date endDate = new Date();

    @BeforeEach
    void setUp() {
        updateLogTimeRequest.setDescription("test");
        updateLogTimeRequest.setStartDate(startDate);
        updateLogTimeRequest.setEndDate(endDate);
    }

    @Test
    void getDescription() {
        assertEquals("test", updateLogTimeRequest.getDescription());
    }

    @Test
    void getStartDate() {
        assertEquals(startDate, updateLogTimeRequest.getStartDate());
    }

    @Test
    void getEndDate() {
        assertEquals(endDate, updateLogTimeRequest.getEndDate());
    }


    @Test
    void setDescription() {
        updateLogTimeRequest.setDescription("test1");
        assertEquals("test1", updateLogTimeRequest.getDescription());
    }

    @Test
    void setStartDate() {
        updateLogTimeRequest.setStartDate(null);
        assertNull(updateLogTimeRequest.getStartDate());
    }

    @Test
    void setEndDate() {
        updateLogTimeRequest.setEndDate(null);
        assertNull(updateLogTimeRequest.getEndDate());
    }

}
