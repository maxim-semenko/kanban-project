package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.CreateProjectRequest;
import com.max.backend.controller.dto.request.CreateProjectStatusRequest;
import com.max.backend.controller.dto.request.UpdateProjectRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.User;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.ProjectStatusRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectStatusRepository projectStatusRepository;
    private final UserRepository userRepository;

    @Override
    public Project findById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Project not found!"));
    }

    @Override
    public Page<Project> findAllByUserId(Pageable pageable, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found!"));
        return projectRepository.findAllByUser(pageable, user);
    }

    @Transactional
    @Override
    public Project create(CreateProjectRequest createProjectRequest) {
        User user = userRepository.findById(createProjectRequest.getCreatorId())
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found!"));

        Project project = Project.builder()
                .name(createProjectRequest.getName())
                .description(createProjectRequest.getDescription())
                .creator(user)
                .members(List.of(user))
                .createdDate(new Date())
                .build();

        List<ProjectStatus> projectStatuses = new ArrayList<>();
        for (CreateProjectStatusRequest projectStatusRequest : createProjectRequest.getProjectStatuses()) {
            projectStatuses.add(ProjectStatus.builder()
                    .name(projectStatusRequest.getName())
                    .limitTotalTask(projectStatusRequest.getLimit())
                    .project(project)
                    .build());
        }

        project.setProjectStatuses(projectStatuses);

        return projectRepository.save(project);
    }

    @Override
    public Project updateById(UpdateProjectRequest updateProjectRequest, Long id) {
        return null;
    }

    @Override
    public Project deleteById(Long id) {
        Project project = findById(id);
        projectRepository.delete(project);

        return project;
    }
}
