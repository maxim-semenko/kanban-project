package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.CreateProjectRequest;
import com.max.backend.controller.dto.request.UpdateProjectRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.User;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.service.ProjectService;
import com.max.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserService userService;

    @Override
    public Project findById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Project not found!"));
    }

    @Override
    public Page<Project> findAllByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return projectRepository.findAllByUser(pageable, user);
    }

    @Override
    public Project create(CreateProjectRequest createProjectRequest) {
        return null;
    }

    @Override
    public Project updateById(UpdateProjectRequest updateProjectRequest) {
        return null;
    }

    @Override
    public Project deleteById(Long id) {

        return null;
    }
}
