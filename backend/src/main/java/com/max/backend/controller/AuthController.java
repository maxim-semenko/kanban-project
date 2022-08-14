package com.max.backend.controller;

import com.max.backend.controller.dto.request.LoginRequest;
import com.max.backend.controller.dto.request.RegisterRequest;
import com.max.backend.controller.dto.request.RestorePasswordRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.MessageResponse;
import com.max.backend.service.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthServiceImpl authService;

    @PostMapping("/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        return new ResponseEntity<>(authService.register(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<JwtResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        return new ResponseEntity<>(authService.login(request), HttpStatus.OK);
    }

    /**
     * Method that restore user's password.
     *
     * @return message response
     */
    @PutMapping("/restore-password")
    @PreAuthorize("permitAll()")
    public ResponseEntity<MessageResponse> restorePassword(@Valid @RequestBody RestorePasswordRequest request) {
        return new ResponseEntity<>(authService.restorePassword(request), HttpStatus.OK);
    }

}
