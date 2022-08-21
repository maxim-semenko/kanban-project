package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.update.UpdatePasswordRequest;
import com.max.backend.controller.dto.request.update.UpdateUserIsNonLockedRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRolesRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.UserResponse;
import com.max.backend.entity.Project;
import com.max.backend.entity.Role;
import com.max.backend.entity.User;
import com.max.backend.exception.EmailAlreadyExistsException;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.exception.UserPasswordNotMatchesException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.RoleRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.security.JwtUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private JwtUtils jwtUtils;


    @Test
    void findById() {
        //given
        Long id = 1L;
        User user = User.builder()
                .id(id)
                .email("email@gmail.com")
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        assertEquals(user, userService.findById(id));
    }

    @Test
    void findAll() {
        //given
        when(userRepository.findAll(any(PageRequest.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), userService.findAll(PageRequest.of(0, 2)));
    }

    @Test
    void findAllByEmail() {
        String email = "test@gmail.com";
        when(userRepository.findAllByEmailContaining(any(PageRequest.class), eq(email))).thenReturn(Page.empty());

        assertEquals(Page.empty(), userService.findAllByEmail(PageRequest.of(0, 2), email));
    }

    @Test
    void findAllByProjectId() {
        //given
        Long projectId = 1L;
        Project project = Project.builder().build();
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(userRepository.findAllByProject(any(PageRequest.class), eq(project))).thenReturn(Page.empty());

        assertEquals(Page.empty(), userService.findAllByProjectId(PageRequest.of(0, 2), projectId));
    }

    @Test
    void findByEmail() {
        //given
        String email = "email@gmail.com";
        User user = User.builder()
                .id(1L)
                .email(email)
                .build();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        assertEquals(user, userService.findByEmail(email));
    }

    @Test
    void updatePasswordByIdWithSuccess() {
        //given
        Long id = 1L;
        UpdatePasswordRequest updateUserRequest = new UpdatePasswordRequest();
        String oldPassword = "12345678";
        updateUserRequest.setOldPassword(oldPassword);
        updateUserRequest.setNewPassword("8765432`");

        User user = User.builder()
                .id(id)
                .password(oldPassword)
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.ofNullable(user));
        when(passwordEncoder.matches(oldPassword, user.getPassword())).thenReturn(true);
        when(userRepository.save(user)).thenReturn(user);

        assertNotNull(userService.updatePasswordById(updateUserRequest, id));
    }

    @Test
    void updatePasswordByIdWithFailedThatPasswordNotMatches() {
        //given
        Long id = 1L;
        UpdatePasswordRequest updatePasswordRequest = new UpdatePasswordRequest();
        String oldPassword = "12345678";
        updatePasswordRequest.setOldPassword(oldPassword);
        updatePasswordRequest.setNewPassword("8765432`");

        User user = User.builder()
                .id(id)
                .password(oldPassword)
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.ofNullable(user));
        when(passwordEncoder.matches(oldPassword, user.getPassword())).thenReturn(false);

        assertThrows(UserPasswordNotMatchesException.class,
                () -> userService.updatePasswordById(updatePasswordRequest, id));
    }

    @Test
    void updateByIdWithSuccess() {
        //given
        Long id = 1L;
        UpdateUserRequest updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setFirstname("firstname");
        updateUserRequest.setLastname("lastname");
        updateUserRequest.setEmail("email@gmail.com");
        updateUserRequest.setSpeciality("speciality");

        User user = User.builder()
                .firstname(updateUserRequest.getFirstname())
                .lastname(updateUserRequest.getLastname())
                .email(updateUserRequest.getEmail())
                .speciality(updateUserRequest.getSpeciality())
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        when(jwtUtils.createToken(user.getEmail(), user.getRoles())).thenReturn("token");
        JwtResponse jwtResponse = new JwtResponse("token", UserResponse.mapUserToDTO(user));

        assertEquals(jwtResponse.getToken(), userService.updateById(updateUserRequest, id).getToken());
    }

    @Test
    void updateByIdWithFailedThatEmailAlreadyExists() {
        //given
        Long id = 1L;
        UpdateUserRequest updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setFirstname("firstname");
        updateUserRequest.setLastname("lastname");
        updateUserRequest.setEmail("email@gmail.com");
        updateUserRequest.setSpeciality("speciality");

        User user = User.builder()
                .firstname(updateUserRequest.getFirstname())
                .lastname(updateUserRequest.getLastname())
                .email("email1@gmail.com")
                .speciality(updateUserRequest.getSpeciality())
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.ofNullable(user));
        when(userRepository.existsByEmail(updateUserRequest.getEmail())).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> userService.updateById(updateUserRequest, id));
    }

    @Test
    void deleteById() {
        //given
        Long id = 1L;

        User user = User.builder()
                .id(id)
                .email("email@gmail.com")
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        assertNotNull(userService.deleteById(id).getMessage());
    }

    @Test
    void updateUserRolesByIdWithSuccess() {
        //given
        Long id = 1L;
        UpdateUserRolesRequest updateUserRolesRequest = new UpdateUserRolesRequest();
        updateUserRolesRequest.setRoles(List.of("ROLE_USER"));

        User user = User.builder()
                .email("email@gmail.com")
                .roles(Set.of())
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(roleRepository.findByName(any())).thenReturn(Optional.ofNullable(Role.builder().build()));
        when(userRepository.save(user)).thenReturn(user);

        assertEquals(user, userService.updateUserRolesById(updateUserRolesRequest, id));
    }

    @Test
    void updateUserRolesByIdWithFailedThatRoleNotFound() {
        //given
        Long id = 1L;
        UpdateUserRolesRequest updateUserRolesRequest = new UpdateUserRolesRequest();
        updateUserRolesRequest.setRoles(List.of("ROLE_USER1"));

        User user = User.builder()
                .email("email@gmail.com")
                .roles(Set.of())
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(roleRepository.findByName(any())).thenReturn(Optional.empty());

        assertThrows(ResourseNotFoundException.class,
                () -> userService.updateUserRolesById(updateUserRolesRequest, id));

    }

    @Test
    void updateUserIsNonLockerById() {
        Long id = 1L;
        UpdateUserIsNonLockedRequest updateUserIsNonLockedRequest = new UpdateUserIsNonLockedRequest();
        updateUserIsNonLockedRequest.setIsNonLocked(true);

        User user = User.builder()
                .email("email@gmail.com")
                .isAccountNonLocked(updateUserIsNonLockedRequest.getIsNonLocked())
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        assertEquals(user, userService.updateUserIsNonLockerById(updateUserIsNonLockedRequest, id));
    }
}