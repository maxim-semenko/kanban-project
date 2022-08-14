package com.max.backend.controller;

import com.max.backend.controller.dto.request.update.UpdatePasswordRequest;
import com.max.backend.controller.dto.request.update.UpdateUserIsNonLockedRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRequest;
import com.max.backend.controller.dto.request.update.UpdateUserRolesRequest;
import com.max.backend.controller.dto.response.JwtResponse;
import com.max.backend.controller.dto.response.MessageResponse;
import com.max.backend.controller.dto.response.UserResponse;
import com.max.backend.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserResponse> findUserById(@PathVariable Long id) {
        return new ResponseEntity<>(UserResponse.mapUserToDTO(userService.findById(id)), HttpStatus.OK);
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<UserResponse>> findAllUsers(Pageable pageable) {
        return new ResponseEntity<>(UserResponse.mapListUserToDTO(userService.findAll(pageable)), HttpStatus.OK);
    }

    @GetMapping("/byEmail/{email}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<UserResponse>> findAllUsersByEmail(Pageable pageable, @PathVariable String email) {
        return new ResponseEntity<>(
                UserResponse.mapListUserToDTO(userService.findAllByEmail(pageable, email)),
                HttpStatus.OK
        );
    }

    @GetMapping("/projects/{projectId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<UserResponse>> findAllUsersByProjectId(@PathVariable Long projectId, Pageable pageable) {
        return new ResponseEntity<>(
                UserResponse.mapListUserToDTO(userService.findAllByProjectId(pageable, projectId)),
                HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
    public ResponseEntity<JwtResponse> updateById(@PathVariable Long id,
                                                  @Valid @RequestBody UpdateUserRequest request) {
        return new ResponseEntity<>(userService.updateById(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
    public ResponseEntity<MessageResponse> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/password")
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
    public ResponseEntity<MessageResponse> updatePassword(@PathVariable Long id,
                                                          @Valid @RequestBody UpdatePasswordRequest request) {
        return new ResponseEntity<>(userService.updatePasswordById(request, id), HttpStatus.OK);
    }

    /**
     * Method that updates user's locked value.
     *
     * @param id      user's id
     * @param request DTO class
     * @return updated user
     */
    @PatchMapping("/{id}/locked")
    @PreAuthorize("hasRole('ADMIN') and #id != authentication.principal.id")
    public ResponseEntity<UserResponse> updateLocked(@PathVariable Long id,
                                                     @RequestBody UpdateUserIsNonLockedRequest request) {
        return new ResponseEntity<>(
                UserResponse.mapUserToDTO(userService.updateUserIsNonLockerById(request, id)),
                HttpStatus.OK
        );
    }

    /**
     * Method that updates user's roles value.
     *
     * @param id      user's id
     * @param request DTO class
     * @return updated user
     */
    @PatchMapping("/{id}/roles")
    @PreAuthorize("hasRole('ADMIN') and #id != authentication.principal.id")
    public ResponseEntity<UserResponse> updateRoles(@PathVariable Long id, @RequestBody UpdateUserRolesRequest request) {
        return new ResponseEntity<>(
                UserResponse.mapUserToDTO(userService.updateUserRolesById(request, id)),
                HttpStatus.OK
        );
    }

}
