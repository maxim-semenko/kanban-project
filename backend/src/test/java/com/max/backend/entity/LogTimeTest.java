package com.max.backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

class LogTimeTest {

    private final LogTime logTime = new LogTime();

    private Date startDate = new Date();
    private Date endDate = new Date();

    @BeforeEach
    void setUp() {
        logTime.setId(1L);
        logTime.setDescription("test");
        logTime.setStartDate(startDate);
        logTime.setEndDate(endDate);
        logTime.setTicket(Ticket.builder().build());
        logTime.setUser(User.builder().build());
    }

    @Test
    void getId() {
        assertEquals(1L, logTime.getId());
    }

    @Test
    void getDescription() {
        assertEquals("test", logTime.getDescription());
    }

    @Test
    void getStartDate() {
        assertEquals(startDate, logTime.getStartDate());
    }

    @Test
    void getEndDate() {
        assertEquals(endDate, logTime.getEndDate());
    }

    @Test
    void getTicket() {
        assertEquals(Ticket.builder().build(), logTime.getTicket());
    }


    @Test
    void getUser() {
        assertEquals(User.builder().build(), logTime.getUser());
    }

    @Test
    void setId() {
        logTime.setId(2L);
        assertEquals(2L, logTime.getId());
    }

    @Test
    void setDescription() {
        logTime.setDescription("test1");
        assertEquals("test1", logTime.getDescription());
    }

    @Test
    void setStartDate() {
        logTime.setStartDate(null);
        assertNull(logTime.getStartDate());
    }

    @Test
    void setEndDate() {
        logTime.setEndDate(null);
        assertNull(logTime.getEndDate());
    }

    @Test
    void setTicket() {
        logTime.setTicket(null);
        assertNull(logTime.getTicket());
    }

    @Test
    void setUser() {
        logTime.setUser(null);
        assertNull(logTime.getUser());
    }

    @Test
    void builder() {
        LogTime logTimeFromBuilder = LogTime.builder()
                .id(1L)
                .description("test")
                .startDate(startDate)
                .endDate(endDate)
                .ticket(Ticket.builder().build())
                .user(User.builder().build())
                .build();
        assertEquals(logTimeFromBuilder,
                new LogTime(1L, "test", Ticket.builder().build(), User.builder().build(), startDate, endDate));
    }

    @Test
    void testToString() {
        assertNotNull(logTime.toString());
    }

}
