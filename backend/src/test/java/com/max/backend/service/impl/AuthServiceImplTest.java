package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.LoginRequest;
import com.max.backend.controller.dto.request.RegisterRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.UserResponse;
import com.max.backend.entity.Role;
import com.max.backend.entity.User;
import com.max.backend.entity.enums.RoleEnum;
import com.max.backend.exception.EmailAlreadyExistsException;
import com.max.backend.repository.RoleRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.security.JwtUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @InjectMocks
    AuthServiceImpl authService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @Test()
    void registerWithFailed() {
        //given
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("email@gmail.com");
        registerRequest.setFirstname("firstname");
        registerRequest.setLastname("lastname");
        registerRequest.setSpeciality("speciality");
        registerRequest.setPassword("password");

        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> {
            authService.register(registerRequest);
        });
    }

    @Test
    void registerWithSuccess() {
        //given
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("email@gmail.com");
        registerRequest.setFirstname("firstname");
        registerRequest.setLastname("lastname");
        registerRequest.setSpeciality("speciality");
        registerRequest.setPassword("password");

        User user = User.builder()
                .id(1L)
                .email(registerRequest.getEmail())
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .speciality(registerRequest.getSpeciality())
                .password(registerRequest.getPassword())
                .build();

        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(roleRepository.findByName(RoleEnum.ROLE_USER)).thenReturn(Optional.ofNullable(Role.builder().build()));
        when(userRepository.save(any())).thenReturn(user);

        assertNotNull(authService.register(registerRequest).getMessage());
    }

    @Test
    void login() {
        //given
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("email@gmail.com");
        loginRequest.setPassword("password");

        User user = User.builder()
                .email(loginRequest.getEmail())
                .roles(Set.of())
                .build();

        JwtResponse jwtResponse = new JwtResponse("token", UserResponse.mapUserToDTO(user));

        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(jwtUtils.createToken(user.getEmail(), user.getRoles())).thenReturn("token");

        assertEquals(jwtResponse.getToken(), authService.login(loginRequest).getToken());

    }

}