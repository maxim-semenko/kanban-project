package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.CreateTaskRequest;
import com.max.backend.controller.dto.request.UpdateTaskRequest;
import com.max.backend.entity.Task;
import com.max.backend.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    @Override
    public Task findById(Long id) {
        return null;
    }

    @Override
    public Page<Task> findAllByProjectId(Pageable pageable, Long projectId) {
        return null;
    }

    @Override
    public Task create(CreateTaskRequest createTaskRequest) {
        return null;
    }

    @Override
    public Task updateById(UpdateTaskRequest updateTaskRequest, Long id) {
        return null;
    }

    @Override
    public Task deleteById(Long id) {
        return null;
    }
}
