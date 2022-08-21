package com.max.backend.controller.dto.response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class JwtResponseTest {

    private final JwtResponse jwtResponse = new JwtResponse();

    @BeforeEach
    void setUp() {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(1L);
        userResponse.setEmail("email@gmail.com");
        userResponse.setFirstname("firstname");
        userResponse.setLastname("lastname");
        userResponse.setSpeciality("speciality");
        userResponse.setIsAccountNonLocked(true);
        userResponse.setCreatedDate(new Date());
        userResponse.setRoles(Set.of());

        jwtResponse.setUser(userResponse);
        jwtResponse.setToken("token");
    }

    @Test
    void getToken() {
        assertEquals("token", jwtResponse.getToken());
    }

    @Test
    void getUser() {
        assertNotNull(jwtResponse.getUser());
    }

    @Test
    void setToken() {
        jwtResponse.setToken("token1");
        assertEquals("token1", jwtResponse.getToken());
    }

    @Test
    void setUser() {
        jwtResponse.setUser(null);
        assertNull(jwtResponse.getUser());
    }

    @Test
    void testToString() {
        assertNotNull(jwtResponse.toString());
    }

    @Test
    void testAllArgsConstructor() {
        JwtResponse jwtResponse1 = new JwtResponse("token", new UserResponse());
        assertNotNull(jwtResponse1);
    }
}