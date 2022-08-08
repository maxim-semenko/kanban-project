package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.CreateTaskRequest;
import com.max.backend.controller.dto.request.UpdateTaskProjectStatusRequest;
import com.max.backend.controller.dto.request.UpdateTaskRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.Task;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.exception.TaskException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.TaskRepository;
import com.max.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    @Override
    public Task findById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Task not found!"));
    }

    @Override
    public Page<Task> findAllByProjectId(Pageable pageable, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Project not found!"));
        return taskRepository.findAllByProject(pageable, project);
    }

    @Override
    public Task create(CreateTaskRequest createTaskRequest) {
        Task task = Task.builder()
                .build();

        return taskRepository.save(task);
    }

    @Override
    public Task updateById(UpdateTaskRequest updateTaskRequest, Long id) {
        return null;
    }

    @Override
    public Task updateProjectStatusById(UpdateTaskProjectStatusRequest updateProjectStatusRequest, Long id) {
        Task task = findById(id);
        ProjectStatus projectStatus = updateProjectStatusRequest.getProjectStatus();
        Long countTasksByProjectStatus = taskRepository.countAllByProjectStatus(projectStatus);

        if (Objects.equals(countTasksByProjectStatus, projectStatus.getLimitTotalTask())) {
            throw new TaskException("Can't update task's project status because limit total task!");
        }
        task.setProjectStatus(projectStatus);
        return taskRepository.save(task);
    }

    @Override
    public Task deleteById(Long id) {
        Task task = findById(id);
        taskRepository.delete(task);
        return task;
    }
}
