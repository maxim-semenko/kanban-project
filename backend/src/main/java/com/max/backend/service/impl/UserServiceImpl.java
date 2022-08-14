package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.update.UpdatePasswordRequest;
import com.max.backend.controller.dto.request.update.UpdateUserIsNonLockedRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRolesRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.MessageResponse;
import com.max.backend.controller.dto.response.UserResponse;
import com.max.backend.entity.Project;
import com.max.backend.entity.Role;
import com.max.backend.entity.User;
import com.max.backend.entity.enums.RoleEnum;
import com.max.backend.exception.EmailAlreadyExistsException;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.exception.UserPasswordNotMatchesException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.RoleRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.security.JwtUtils;
import com.max.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final ProjectRepository projectRepository;
    private final JwtUtils jwtUtils;

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("User not found!"));
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public Page<User> findAllByEmail(Pageable pageable, String email) {
        return userRepository.findAllByEmailContaining(pageable, email);
    }

    @Override
    public Page<User> findAllByProjectId(Pageable pageable, Long projectId) {
        return userRepository.findAllByProject(pageable, getProjectById(projectId));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourseNotFoundException("User not found by email!"));
    }

    @Override
    public MessageResponse updatePasswordById(UpdatePasswordRequest updatePasswordRequest, Long id) {
        String oldPassword = updatePasswordRequest.getOldPassword();
        String newPassword = updatePasswordRequest.getNewPassword();
        User existUser = findById(id);

        if (!passwordEncoder.matches(oldPassword, existUser.getPassword())) {
            throw new UserPasswordNotMatchesException("User password not matches!");
        }

        existUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existUser);

        return new MessageResponse("User password was updated successfully!");
    }

    @Override
    @Transactional
    public JwtResponse updateById(UpdateUserRequest updateUserRequest, Long id) {
        User user = findById(id);
        if (!updateUserRequest.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(updateUserRequest.getEmail())) {
                throw new EmailAlreadyExistsException("Email is already in use!");
            }
        }

        user.setFirstname(updateUserRequest.getFirstname());
        user.setLastname(updateUserRequest.getLastname());
        user.setEmail(updateUserRequest.getEmail());
        user.setSpeciality(updateUserRequest.getSpeciality());
        userRepository.save(user);

        String token = jwtUtils.createToken(user.getEmail(), user.getRoles());
        return new JwtResponse(token, UserResponse.mapUserToDTO(user));
    }

    @Override
    @Transactional
    public MessageResponse deleteById(Long id) {
        User user = findById(id);
        userRepository.delete(user);
        return new MessageResponse("Account was deleted successfully!");
    }

    @Override
    public User updateUserRolesById(UpdateUserRolesRequest updateUserRolesRequest, Long id) {
        User user = findById(id);
        Set<Role> roles = new HashSet<>();
        updateUserRolesRequest
                .getRoles()
                .forEach(name -> {
                    try {
                        roles.add(roleRepository.findByName(RoleEnum.valueOf(name))
                                .orElseThrow(() -> new ResourseNotFoundException("Role not found!")));
                    } catch (IllegalArgumentException e) {
                        throw new ResourseNotFoundException("RoleEnum is invalid!");
                    }
                });

        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Override
    public User updateUserIsNonLockerById(UpdateUserIsNonLockedRequest updateUserIsNonLockedRequest, Long id) {
        User user = findById(id);
        user.setIsAccountNonLocked(updateUserIsNonLockedRequest.getIsNonLocked());

        return userRepository.save(user);
    }

    private Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourseNotFoundException("Project not found!"));
    }

}
