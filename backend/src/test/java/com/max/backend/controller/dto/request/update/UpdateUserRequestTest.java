package com.max.backend.controller.dto.request.update;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdateUserRequestTest {

    private final UpdateUserRequest updateUserRequest = new UpdateUserRequest();

    @BeforeEach
    void setUp() {
        updateUserRequest.setFirstname("firstname");
        updateUserRequest.setLastname("lastname");
        updateUserRequest.setEmail("email@gmail.com");
        updateUserRequest.setSpeciality("speciality");
    }

    @Test
    void getFirstname() {
        assertEquals("firstname", updateUserRequest.getFirstname());
    }

    @Test
    void getLastname() {
        assertEquals("lastname", updateUserRequest.getLastname());
    }

    @Test
    void getEmail() {
        assertEquals("email@gmail.com", updateUserRequest.getEmail());
    }

    @Test
    void getSpeciality() {
        assertEquals("speciality", updateUserRequest.getSpeciality());
    }

    @Test
    void setFirstname() {
        updateUserRequest.setFirstname("firstname1");
        assertEquals("firstname1", updateUserRequest.getFirstname());

    }

    @Test
    void setLastname() {
        updateUserRequest.setLastname("lastname1");
        assertEquals("lastname1", updateUserRequest.getLastname());

    }

    @Test
    void setEmail() {
        updateUserRequest.setEmail("email1@gmail.com");
        assertEquals("email1@gmail.com", updateUserRequest.getEmail());
    }

    @Test
    void setSpeciality() {
        updateUserRequest.setSpeciality("speciality1");
        assertEquals("speciality1", updateUserRequest.getSpeciality());
    }
}