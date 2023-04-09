package com.max.backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ProjectStatusTest {

    private final ProjectStatus projectStatus = new ProjectStatus();

    @BeforeEach
    void setUp() {
        projectStatus.setId(1L);
        projectStatus.setProject(new Project());
        projectStatus.setName("Test");
        projectStatus.setLimitTotalTicket(10L);
        projectStatus.setTickets(List.of());
    }

    @Test
    void getId() {
        assertEquals(1L, projectStatus.getId());
    }

    @Test
    void getName() {
        assertEquals("Test", projectStatus.getName());
    }

    @Test
    void getLimitTotalTask() {
        assertEquals(10L, projectStatus.getLimitTotalTicket());
    }

    @Test
    void getProject() {
        assertEquals(new Project(), projectStatus.getProject());
    }

    @Test
    void getTasks() {
        assertEquals(List.of(), projectStatus.getTickets());
    }

    @Test
    void setId() {
        projectStatus.setId(2L);
        assertEquals(2L, projectStatus.getId());
    }

    @Test
    void setName() {
        projectStatus.setName("Test1");
        assertEquals("Test1", projectStatus.getName());
    }

    @Test
    void setLimitTotalTask() {
        projectStatus.setLimitTotalTicket(1L);
        assertEquals(1L, projectStatus.getLimitTotalTicket());
    }

    @Test
    void setProject() {
        projectStatus.setProject(null);
        assertNull(projectStatus.getProject());
    }

    @Test
    void setTasks() {
        projectStatus.setTickets(null);
        assertNull(projectStatus.getTickets());
    }

    @Test
    void builder() {
        ProjectStatus projectStatusBuilder = ProjectStatus.builder()
                .id(1L)
                .name("Test")
                .project(new Project())
                .limitTotalTicket(10L)
                .tickets(List.of())
                .build();
        assertEquals(projectStatus, projectStatusBuilder);

    }
}
