package com.max.backend.service;

import com.max.backend.controller.dto.request.UpdatePasswordRequest;
import com.max.backend.controller.dto.request.UpdateUserIsNonLockedRequest;
import com.max.backend.controller.dto.request.UpdateUserRequest;
import com.max.backend.controller.dto.request.UpdateUserRolesRequest;
import com.max.backend.controller.dto.response.MessageResponse;
import com.max.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<User> findAll(Pageable pageable);

    Page<User> findAllByProjectId(Pageable pageable, Long projectId);

    User findById(Long id);

    User findByUsername(String username);

    User findByEmail(String email);

    Page<User> findAllByUsernameContaining(Pageable pageable, String username);

    User updateById(UpdateUserRequest updateUserRequest, Long id);

    MessageResponse deleteById(Long id);

    MessageResponse updatePasswordById(UpdatePasswordRequest updatePasswordRequest, Long id);

    User updateUserRolesById(UpdateUserRolesRequest updateUserRolesRequest, Long id);

    User updateUserIsNonLockerById(UpdateUserIsNonLockedRequest updateUserIsNonLockedRequest, Long id);

}
