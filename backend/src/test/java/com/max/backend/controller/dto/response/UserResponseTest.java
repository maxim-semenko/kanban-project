package com.max.backend.controller.dto.response;

import com.max.backend.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class UserResponseTest {

    private final UserResponse userResponse = new UserResponse();

    @BeforeEach
    void setUp() {
        userResponse.setId(1L);
        userResponse.setEmail("email@gmail.com");
        userResponse.setFirstname("firstname");
        userResponse.setLastname("lastname");
        userResponse.setSpeciality("speciality");
        userResponse.setIsAccountNonLocked(true);
        userResponse.setCreatedDate(new Date());
        userResponse.setRoles(Set.of());
    }

    @Test
    void mapListUserToDTO() {
        List<User> userList = new ArrayList<>();
        userList.add(User.builder().id(1L).build());
        userList.add(User.builder().id(2L).build());
        final Page<User> userPage = new PageImpl<>(userList);

        assertEquals(userList.size(), UserResponse.mapListUserToDTO(userPage).getTotalElements());
    }

    @Test
    void getId() {
        assertEquals(1L, userResponse.getId());
    }

    @Test
    void getFirstname() {
        assertEquals("firstname", userResponse.getFirstname());
    }

    @Test
    void getLastname() {
        assertEquals("lastname", userResponse.getLastname());
    }

    @Test
    void getEmail() {
        assertEquals("email@gmail.com", userResponse.getEmail());
    }

    @Test
    void getSpeciality() {
        assertEquals("speciality", userResponse.getSpeciality());
    }

    @Test
    void getCreatedDate() {
        assertNotNull(userResponse.getCreatedDate());
    }

    @Test
    void getIsAccountNonLocked() {
        assertTrue(userResponse.getIsAccountNonLocked());
    }

    @Test
    void getRoles() {
        assertEquals(Set.of(), userResponse.getRoles());
    }

    @Test
    void setId() {
        userResponse.setId(2L);
        assertEquals(2L, userResponse.getId());
    }

    @Test
    void setFirstname() {
        userResponse.setFirstname("firstname1");
        assertEquals("firstname1", userResponse.getFirstname());
    }

    @Test
    void setLastname() {
        userResponse.setLastname("lastname1");
        assertEquals("lastname1", userResponse.getLastname());
    }

    @Test
    void setEmail() {
        userResponse.setEmail("email1@gmail.com");
        assertEquals("email1@gmail.com", userResponse.getEmail());
    }

    @Test
    void setSpeciality() {
        userResponse.setSpeciality("speciality1");
        assertEquals("speciality1", userResponse.getSpeciality());
    }

    @Test
    void setCreatedDate() {
        userResponse.setCreatedDate(null);
        assertNull(userResponse.getCreatedDate());
    }

    @Test
    void setIsAccountNonLocked() {
        userResponse.setIsAccountNonLocked(false);
        assertEquals(false, userResponse.getIsAccountNonLocked());
    }

    @Test
    void setRoles() {
        userResponse.setRoles(null);
        assertNull(userResponse.getRoles());
    }

    @Test
    void testToString() {
        assertNotNull(userResponse.toString());
    }
}