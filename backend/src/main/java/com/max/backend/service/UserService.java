package com.max.backend.service;

import com.max.backend.controller.dto.request.update.UpdatePasswordRequest;
import com.max.backend.controller.dto.request.update.UpdateUserIsNonLockedRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRolesRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.MessageResponse;
import com.max.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<User> findAll(Pageable pageable);

    Page<User> findAllByProjectId(Pageable pageable, Long projectId);

    User findById(Long id);

    Page<User> findAllByEmail(Pageable pageable, String email);

    User findByEmail(String email);

    JwtResponse updateById(UpdateUserRequest updateUserRequest, Long id);

    MessageResponse deleteById(Long id);

    MessageResponse updatePasswordById(UpdatePasswordRequest updatePasswordRequest, Long id);

    User updateUserRolesById(UpdateUserRolesRequest updateUserRolesRequest, Long id);

    User updateUserIsNonLockerById(UpdateUserIsNonLockedRequest updateUserIsNonLockedRequest, Long id);

}
