package com.max.backend.security;

import com.max.backend.entity.Role;
import com.max.backend.entity.enums.RoleEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    @BeforeEach
    public void setUp() {
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "my_secret_key");
    }


    @Test
    void createToken() {
        String username = "test";
        Set<Role> roles = Set.of(Role.builder().name(RoleEnum.ROLE_USER).build());


        assertNotNull(jwtUtils.createToken(username, roles));
    }

    @Test
    void getUsernameFromJwtToken() {
    }
}