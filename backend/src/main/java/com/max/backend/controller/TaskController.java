package com.max.backend.controller;

import com.max.backend.controller.dto.request.create.CreateTaskRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Task;
import com.max.backend.service.TaskService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/priorities")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Priority>> findAllPriorities(Pageable pageable) {
        return new ResponseEntity<>(taskService.findAllTaskPriorities(pageable), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Task> createTask(@RequestBody @Valid CreateTaskRequest request) {
        return new ResponseEntity<>(taskService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Task> updateTaskById(@RequestBody @Valid UpdateTaskRequest request, @PathVariable Long id) {
        return new ResponseEntity<>(taskService.updateById(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Task> deleteTaskById(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.deleteById(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/project-status")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Task> updateTaskById(@RequestBody @Valid UpdateTaskProjectStatusRequest request,
                                               @PathVariable Long id) {
        return new ResponseEntity<>(taskService.updateProjectStatusById(request, id), HttpStatus.OK);
    }

    @PutMapping("/{taskId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Task> addUserToTask(@PathVariable Long taskId, @PathVariable Long userId) {
        return new ResponseEntity<>(taskService.addUser(taskId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/{taskId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Task> removeUserFromTask(@PathVariable Long taskId, @PathVariable Long userId) {
        return new ResponseEntity<>(taskService.removeUser(taskId, userId), HttpStatus.OK);
    }

}
