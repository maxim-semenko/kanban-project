package com.max.backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private final User user = new User();

    @BeforeEach
    void setUp() {
        user.setId(1L);
        user.setFirstname("firstname");
        user.setLastname("lastname");
        user.setEmail("email");
        user.setSpeciality("speciality");
        user.setPassword("password");
        user.setCreatedDate(new Date());
        user.setIsAccountNonLocked(true);
        user.setRoles(Set.of());
        user.setProjects(List.of());
    }

    @Test
    void getId() {
        assertEquals(1L, user.getId());
    }

    @Test
    void getEmail() {
        assertEquals("email", user.getEmail());
    }

    @Test
    void getPassword() {
        assertEquals("password", user.getPassword());
    }

    @Test
    void getFirstname() {
        assertEquals("firstname", user.getFirstname());
    }

    @Test
    void getLastname() {
        assertEquals("lastname", user.getLastname());
    }

    @Test
    void getSpeciality() {
        assertEquals("speciality", user.getSpeciality());
    }

    @Test
    void getCreatedDate() {
        assertNotNull(user.getCreatedDate());
    }

    @Test
    void getIsAccountNonLocked() {
        assertEquals(true, user.getIsAccountNonLocked());
    }

    @Test
    void getRoles() {
        assertNotNull(user.getRoles());
    }

    @Test
    void getProjects() {
        assertNotNull(user.getProjects());
    }

    @Test
    void setId() {
        user.setId(2L);
        assertEquals(2L, user.getId());
    }

    @Test
    void setEmail() {
        user.setEmail("email2");
        assertEquals("email2", user.getEmail());
    }

    @Test
    void setPassword() {
        user.setPassword("password2");
        assertEquals("password2", user.getPassword());
    }

    @Test
    void setFirstname() {
        user.setFirstname("firstname2");
        assertEquals("firstname2", user.getFirstname());
    }

    @Test
    void setLastname() {
        user.setLastname("lastname2");
        assertEquals("lastname2", user.getLastname());
    }

    @Test
    void setSpeciality() {
        user.setSpeciality("speciality2");
        assertEquals("speciality2", user.getSpeciality());
    }

    @Test
    void setCreatedDate() {
        user.setCreatedDate(null);
        assertNull(user.getCreatedDate());
    }

    @Test
    void setIsAccountNonLocked() {
        user.setIsAccountNonLocked(false);
        assertEquals(false, user.getIsAccountNonLocked());
    }

    @Test
    void setRoles() {
        user.setRoles(null);
        assertNull(user.getRoles());
    }

    @Test
    void setProjects() {
        user.setProjects(null);
        assertNull(user.getProjects());
    }

    @Test
    void testToString() {
        assertNotNull(user.toString());
    }

    @Test
    void builder() {
        User userBuilder = User.builder().build();
        assertNotNull(userBuilder);
    }
}