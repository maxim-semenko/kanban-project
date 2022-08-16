package com.max.backend.entity;

import com.max.backend.entity.enums.PriorityEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PriorityTest {

    private final Priority priority = new Priority();

    @BeforeEach
    void setUp() {
        priority.setId(1L);
        priority.setName(PriorityEnum.LOW);
    }

    @Test
    void getId() {
        assertEquals(1L, priority.getId());
    }

    @Test
    void getName() {
        assertEquals(PriorityEnum.LOW, priority.getName());
    }

    @Test
    void setId() {
        priority.setId(2L);
        assertEquals(2L, priority.getId());
    }

    @Test
    void setName() {
        priority.setName(PriorityEnum.HIGH);
        assertEquals(PriorityEnum.HIGH, priority.getName());
    }

    @Test
    void builder() {
        Priority priorityFromBuilder = Priority.builder()
                .id(1L)
                .name(PriorityEnum.LOW)
                .build();
        assertEquals(priorityFromBuilder, new Priority(1L, PriorityEnum.LOW));
    }
}