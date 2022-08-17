package com.max.backend.service.impl;

import com.max.backend.util.SecurityUtil;
import com.max.backend.controller.dto.request.create.CreateTaskRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.Task;
import com.max.backend.entity.User;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.exception.ResourseForbiddenException;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.exception.TaskException;
import com.max.backend.repository.PriorityRepository;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.ProjectStatusRepository;
import com.max.backend.repository.TaskRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final PriorityRepository priorityRepository;
    private final ProjectStatusRepository projectStatusRepository;

    @Override
    public Task findById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Task not found!"));
    }

    @Override
    public Page<Task> findAllByProjectId(Pageable pageable, Long projectId) {
        return taskRepository.findAllByProject(pageable, getProjectById(projectId));
    }

    @Override
    public Page<Priority> findAllTaskPriorities(Pageable pageable) {
        return priorityRepository.findAll(pageable);
    }

    @Override
    public Task create(CreateTaskRequest createTaskRequest) {
        Task task = Task.builder()
                .name(createTaskRequest.getName())
                .description(createTaskRequest.getDescription())
                .projectStatus(getProjectStatusById(createTaskRequest.getProjectStatusId()))
                .priority(getPriorityById(createTaskRequest.getPriorityId()))
                .project(getProjectById(createTaskRequest.getProjectId()))
                .expiryDate(createTaskRequest.getExpiryDate())
                .createdDate(new Date())
                .build();

        ProjectStatus projectStatus = task.getProjectStatus();
        Long countTasksByProjectStatus = taskRepository.countAllByProjectStatus(task.getProjectStatus());

        if (Objects.equals(countTasksByProjectStatus, projectStatus.getLimitTotalTask())) {
            throw new TaskException("Can't add new task with this status because limit total task!");
        }

        return taskRepository.save(task);
    }

    @Override
    public Task updateById(UpdateTaskRequest updateTaskRequest, Long id) {
        Task task = findById(id);
        if (!task.getProject().getCreator().getEmail().equals(SecurityUtil.getCurrentUsername())) {
            throw new ResourseForbiddenException("Only project creator can update task!");
        }

        task.setName(updateTaskRequest.getName());
        task.setDescription(updateTaskRequest.getDescription());
        task.setPriority(getPriorityById(updateTaskRequest.getPriorityId()));
        task.setExpiryDate(updateTaskRequest.getExpiryDate());

        return taskRepository.save(task);
    }

    @Override
    public Task updateStatusById(UpdateTaskProjectStatusRequest updateProjectStatusRequest, Long id) {
        Task task = findById(id);
        if (!task.getExecutors().contains(getUserByEmail(SecurityUtil.getCurrentUsername()))) {
            throw new ResourseForbiddenException("Only executor of task can update status!");
        }

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

    @Override
    public Task addUser(Long taskId, Long userId) {
        Task task = findById(taskId);
        User existedUser = getUserById(userId);

        if (!task.getProject().getMembers().contains(existedUser)) {
            throw new ProjectMemberException("User is not a member of project!");
        }

        if (!task.getExecutors().isEmpty()) {
            task.getExecutors()
                    .stream()
                    .filter(user -> !user.equals(existedUser)).findFirst()
                    .orElseThrow(() -> new ProjectMemberException("User is already exists in task!"));
        }
        task.getExecutors().add(existedUser);

        return taskRepository.save(task);
    }

    @Override
    public Task removeUser(Long taskId, Long userId) {
        Task task = findById(taskId);
        User existedUser = getUserById(userId);

        task.getExecutors()
                .stream()
                .filter(user -> user.equals(existedUser)).findFirst()
                .orElseThrow(() -> new ProjectMemberException("User not found in task!"));
        task.getExecutors().remove(existedUser);

        return taskRepository.save(task);
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourseNotFoundException("User not found!"));
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourseNotFoundException("User not found!"));
    }

    private Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourseNotFoundException("Project not found!"));
    }

    private Priority getPriorityById(Long priorityId) {
        return priorityRepository.findById(priorityId)
                .orElseThrow(() -> new ResourseNotFoundException("Priority not found!"));
    }

    private ProjectStatus getProjectStatusById(Long projectStatusId) {
        return projectStatusRepository.findById(projectStatusId)
                .orElseThrow(() -> new ResourseNotFoundException("ProjectStatus not found!"));
    }
}
