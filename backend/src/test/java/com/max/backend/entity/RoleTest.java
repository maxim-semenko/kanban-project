package com.max.backend.entity;

import com.max.backend.entity.enums.RoleEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RoleTest {

    private final Role role = new Role();

    @BeforeEach
    void setUp() {
        role.setId(1L);
        role.setName(RoleEnum.ROLE_USER);
    }

    @Test
    void getId() {
        assertEquals(1L, role.getId());
    }

    @Test
    void getName() {
        assertEquals(RoleEnum.ROLE_USER, role.getName());
    }

    @Test
    void setId() {
        role.setId(2L);
        assertEquals(2L, role.getId());
    }

    @Test
    void setName() {
        role.setName(RoleEnum.ROLE_ADMIN);
        assertEquals(RoleEnum.ROLE_ADMIN, role.getName());
    }

    @Test
    void builder() {
        Role roleFromBuilder = Role.builder()
                .id(1L)
                .name(RoleEnum.ROLE_USER)
                .build();
        assertEquals(roleFromBuilder, new Role(1L, RoleEnum.ROLE_USER));
    }
}