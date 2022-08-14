package com.max.backend.service;

import com.max.backend.controller.dto.request.create.CreateTaskRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    Task findById(Long id);

    Page<Task> findAllByProjectId(Pageable pageable, Long projectId);

    Page<Priority> findAllTaskPriorities(Pageable pageable);

    Task create(CreateTaskRequest createTaskRequest);

    Task updateById(UpdateTaskRequest updateTaskRequest, Long id);

    Task updateProjectStatusById(UpdateTaskProjectStatusRequest updateProjectStatusRequest, Long id);

    Task deleteById(Long id);
}
