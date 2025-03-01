package com.max.backend.service;

import com.max.backend.controller.dto.request.LoginRequest;
import com.max.backend.controller.dto.request.RegisterRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.MessageResponse;

public interface AuthService {

    JwtResponse register(RegisterRequest request);

    JwtResponse login(LoginRequest request);

}
