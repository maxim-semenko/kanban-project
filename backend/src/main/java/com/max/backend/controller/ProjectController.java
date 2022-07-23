package com.max.backend.controller;

import com.max.backend.entity.Project;
import com.max.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/{id}")
//    @PreAuthorize("hasRole('USER')")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Project> findProjectsById(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
//    @PreAuthorize("hasRole('USER')")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Page<Project>> findProjectsByUserId(@PathVariable Long userId, Pageable pageable) {
        return new ResponseEntity<>(projectService.findAllByUserId(pageable, userId), HttpStatus.OK);
    }
}
