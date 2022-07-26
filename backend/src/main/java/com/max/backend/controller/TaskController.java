package com.max.backend.controller;

import com.max.backend.controller.dto.request.CreateProjectRequest;
import com.max.backend.controller.dto.request.CreateTaskRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.Task;
import com.max.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Task> findTaskById(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/projects/{projectId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Task>> findTasksByProjectId(@PathVariable Long projectId, Pageable pageable) {
        return new ResponseEntity<>(taskService.findAllByProjectId(pageable, projectId), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Task> createTask(@RequestBody @Valid CreateTaskRequest request) {
        return new ResponseEntity<>(taskService.create(request), HttpStatus.CREATED);
    }
}
