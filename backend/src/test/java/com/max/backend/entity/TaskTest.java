package com.max.backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

class TaskTest {

    private final Task task = new Task();

    @BeforeEach
    void setUp() {
        task.setId(1L);
        task.setName("Name");
        task.setDescription("Description");
        task.setPriority(Priority.builder().build());
        task.setProjectStatus(ProjectStatus.builder().build());
        task.setExpiryDate(new Date());
        task.setCreatedDate(new Date());
        task.setProject(Project.builder().build());
        task.setExecutors(List.of());
    }

    @Test
    void getId() {
        assertEquals(1L, task.getId());
    }

    @Test
    void getName() {
        assertEquals("Name", task.getName());
    }

    @Test
    void getDescription() {
        assertEquals("Description", task.getDescription());
    }

    @Test
    void getCreatedDate() {
        assertNotNull(task.getCreatedDate());
    }

    @Test
    void getExpiryDate() {
        assertNotNull(task.getExpiryDate());
    }

    @Test
    void getPriority() {
        assertNotNull(task.getPriority());
    }

    @Test
    void getProject() {
        assertNotNull(task.getProject());
    }

    @Test
    void getProjectStatus() {
        assertNotNull(task.getProjectStatus());

    }

    @Test
    void getExecutors() {
        assertNotNull(task.getExecutors());
    }

    @Test
    void setId() {
        task.setId(2L);
        assertEquals(2L, task.getId());
    }

    @Test
    void setName() {
        task.setName("Name1");
        assertEquals("Name1", task.getName());
    }

    @Test
    void setDescription() {
        task.setDescription("Description1");
        assertEquals("Description1", task.getDescription());
    }

    @Test
    void setCreatedDate() {
        task.setCreatedDate(null);
        assertNull(task.getCreatedDate());
    }

    @Test
    void setExpiryDate() {
        task.setExpiryDate(null);
        assertNull(task.getExpiryDate());
    }

    @Test
    void setPriority() {
        task.setPriority(null);
        assertNull(task.getPriority());
    }

    @Test
    void setProject() {
        task.setProject(null);
        assertNull(task.getProject());
    }

    @Test
    void setProjectStatus() {
        task.setProjectStatus(null);
        assertNull(task.getProjectStatus());
    }

    @Test
    void setExecutors() {
        task.setExecutors(null);
        assertNull(task.getExecutors());
    }

    @Test
    void testToString() {
        assertNotNull(task.toString());
    }
}