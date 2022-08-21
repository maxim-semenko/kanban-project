package com.max.backend.util;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtil {

    private static final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    public static String getCurrentUsername() {
        return authentication.getName();
    }
}
