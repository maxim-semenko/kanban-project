package com.max.backend.service;

import com.max.backend.controller.dto.request.create.CreateProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectStatusRequest;
import com.max.backend.entity.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;

public interface ProjectStatusService {

    Page<ProjectStatus> findAllByProjectId(Pageable pageable, Long projectId);

    ProjectStatus findById(Long id);

    ProjectStatus create(CreateProjectStatusRequest createProjectStatusRequest);

    ProjectStatus updateById(UpdateProjectStatusRequest updateProjectStatusRequest, Long id);

    ProjectStatus deleteById(Long id);
}
