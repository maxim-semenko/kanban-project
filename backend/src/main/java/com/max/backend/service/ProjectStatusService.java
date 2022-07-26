package com.max.backend.service;

import com.max.backend.controller.dto.request.UpdateProjectStatusRequest;
import com.max.backend.entity.ProjectStatus;
import org.springframework.data.domain.Page;

public interface ProjectStatusService {

    Page<ProjectStatus> findAllByProjectId(Long projectId);

    ProjectStatus updateById(UpdateProjectStatusRequest updateProjectStatusRequest, Long id);

    ProjectStatus deleteById(Long id);
}
