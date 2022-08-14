package com.max.backend.controller;

import com.max.backend.controller.dto.request.create.CreateProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectStatusRequest;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.service.ProjectStatusService;
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
@RequestMapping("/api/v1/project-statuses")
@RequiredArgsConstructor
public class ProjectStatusController {

    private final ProjectStatusService projectStatusService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProjectStatus> findProjectStatusById(@PathVariable Long id) {
        return new ResponseEntity<>(projectStatusService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/projects/{projectId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<ProjectStatus>> findAllProjectStatusesByProjectId(@PathVariable Long projectId,
                                                                                 Pageable pageable) {
        return new ResponseEntity<>(projectStatusService.findAllByProjectId(pageable, projectId), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProjectStatus> createProjectStatus(@Valid @RequestBody CreateProjectStatusRequest request) {
        return new ResponseEntity<>(projectStatusService.create(request), HttpStatus.OK);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProjectStatus> updateProjectStatusById(@Valid @RequestBody UpdateProjectStatusRequest request,
                                                                 @PathVariable Long id) {
        return new ResponseEntity<>(projectStatusService.updateById(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProjectStatus> deleteProjectStatusById(@PathVariable Long id) {
        return new ResponseEntity<>(projectStatusService.deleteById(id), HttpStatus.OK);
    }

}
