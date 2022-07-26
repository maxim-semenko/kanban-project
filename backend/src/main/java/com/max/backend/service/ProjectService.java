package com.max.backend.service;

import com.max.backend.controller.dto.request.CreateProjectRequest;
import com.max.backend.controller.dto.request.UpdateProjectRequest;
import com.max.backend.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectService {

    Project findById(Long id);

    Page<Project> findAllByUserId(Pageable pageable, Long userId);

    Project create(CreateProjectRequest createProjectRequest);

    Project updateById(UpdateProjectRequest updateProjectRequest, Long id);

    Project deleteById(Long id);

}
