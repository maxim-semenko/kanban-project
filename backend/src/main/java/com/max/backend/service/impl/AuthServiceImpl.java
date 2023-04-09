package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.LoginRequest;
import com.max.backend.controller.dto.request.RegisterRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.MessageResponse;
import com.max.backend.controller.dto.response.UserResponse;
import com.max.backend.entity.User;
import com.max.backend.entity.enums.RoleEnum;
import com.max.backend.exception.EmailAlreadyExistsException;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.RoleRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.security.JwtUtils;
import com.max.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public JwtResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already in use!");
        }

        User user = new User();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setSpeciality(request.getSpeciality());
        user.setCreatedDate(new Date());
        user.setRoles(Set.of(roleRepository.findByName(RoleEnum.ROLE_USER)
                .orElseThrow(() -> new ResourseNotFoundException("Role not found!"))));

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        String token = jwtUtils.createToken(user.getEmail(), user.getRoles());

        return new JwtResponse(token, UserResponse.mapUserToDTO(user));
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourseNotFoundException("User was not found!"));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        String token = jwtUtils.createToken(request.getEmail(), user.getRoles());

        return new JwtResponse(token, UserResponse.mapUserToDTO(user));
    }

}
