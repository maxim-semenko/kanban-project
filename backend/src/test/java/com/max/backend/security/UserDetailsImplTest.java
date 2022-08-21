package com.max.backend.security;

import com.max.backend.entity.Role;
import com.max.backend.entity.User;
import com.max.backend.entity.enums.RoleEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

class UserDetailsImplTest {

    User user = User.builder()
            .id(1L)
            .email("email@gmail.com")
            .password("password")
            .isAccountNonLocked(true)
            .roles(Set.of(Role.builder().name(RoleEnum.ROLE_USER).build()))
            .build();

    private UserDetailsImpl userDetails;

    @BeforeEach
    void setUp() {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        userDetails = new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getIsAccountNonLocked(),
                user.getPassword(),
                authorities);
    }

    @Test
    void build() {
        assertEquals(userDetails, UserDetailsImpl.build(user));
    }

    @Test
    void getAuthorities() {
    }

    @Test
    void getId() {
        assertEquals(1L, userDetails.getId());
    }

    @Test
    void getEmail() {
        assertEquals("email@gmail.com", userDetails.getEmail());
    }

    @Test
    void getPassword() {
        assertEquals("password", userDetails.getPassword());
    }

    @Test
    void getUsername() {
        assertEquals("email@gmail.com", userDetails.getUsername());
    }

    @Test
    void isAccountNonExpired() {
        assertTrue(userDetails.isAccountNonExpired());
    }

    @Test
    void isAccountNonLocked() {
        assertTrue(userDetails.isAccountNonLocked());
    }

    @Test
    void isCredentialsNonExpired() {
        assertTrue(userDetails.isCredentialsNonExpired());
    }

    @Test
    void isEnabled() {
        assertTrue(userDetails.isEnabled());
    }

    @Test
    void testToString() {
        assertNotNull(userDetails.toString());
    }
}