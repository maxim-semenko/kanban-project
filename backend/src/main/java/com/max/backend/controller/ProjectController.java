package com.max.backend.controller;

import com.max.backend.controller.dto.request.CreateProjectRequest;
import com.max.backend.controller.dto.request.UpdateProjectRequest;
import com.max.backend.entity.Project;
import com.max.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Project> findProjectsById(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Project>> findProjectsByUserId(@PathVariable Long userId, Pageable pageable) {
        return new ResponseEntity<>(projectService.findAllByUserId(pageable, userId), HttpStatus.OK);
    }


    @PostMapping("/")
    @PreAuthorize("hasRole('USER') and #request.creatorId == authentication.principal.id")
    public ResponseEntity<Project> createProject(@RequestBody @Valid CreateProjectRequest request) {
        return new ResponseEntity<>(projectService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Project> updateProjectById(@PathVariable Long id,
                                                     @RequestBody @Valid UpdateProjectRequest request) {
        return new ResponseEntity<>(projectService.updateById(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Project> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.deleteById(id), HttpStatus.OK);
    }

    @PutMapping("/{projectId}/users/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Project> addUserToProject(@PathVariable Long projectId, @PathVariable Long userId) {
        return new ResponseEntity<>(projectService.addUser(projectId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}/users/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Project> deleteUserFromProject(@PathVariable Long projectId, @PathVariable Long userId) {
        return new ResponseEntity<>(projectService.deleteUser(projectId, userId), HttpStatus.OK);
    }

}
