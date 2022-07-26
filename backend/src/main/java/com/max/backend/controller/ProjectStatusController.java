package com.max.backend.controller;

import com.max.backend.entity.ProjectStatus;
import com.max.backend.service.ProjectStatusService;
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
@RequestMapping("/api/v1/project-statuses")
@RequiredArgsConstructor
public class ProjectStatusController {

    private final ProjectStatusService projectStatusService;

    @GetMapping("/projects/{projectId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<ProjectStatus>> findAllProjectStatusesByProjectId(@PathVariable Long projectId,
                                                                                 Pageable pageable) {
        return new ResponseEntity<>(projectStatusService.findAllByProjectId(pageable, projectId), HttpStatus.OK);
    }

}
