package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.UpdateTaskProjectStatusRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.ProjectStatusRepository;
import com.max.backend.service.ProjectStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectStatusServiceImpl implements ProjectStatusService {

    private final ProjectStatusRepository projectStatusRepository;
    private final ProjectRepository projectRepository;

    @Override
    public Page<ProjectStatus> findAllByProjectId(Pageable pageable, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Project not found!"));

        return projectStatusRepository.findAllByProject(pageable, project);
    }

    @Override
    public ProjectStatus updateById(UpdateTaskProjectStatusRequest updateProjectStatusRequest, Long id) {
        return null;
    }

    @Override
    public ProjectStatus deleteById(Long id) {
        return null;
    }
}
