package com.max.backend.service;

import com.max.backend.controller.dto.request.UpdateTaskProjectStatusRequest;
import com.max.backend.entity.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectStatusService {

    Page<ProjectStatus> findAllByProjectId(Pageable pageable,Long projectId);

    ProjectStatus updateById(UpdateTaskProjectStatusRequest updateProjectStatusRequest, Long id);

    ProjectStatus deleteById(Long id);
}
