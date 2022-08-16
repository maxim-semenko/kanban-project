package com.max.backend.service;

import com.max.backend.controller.dto.request.create.CreateProjectRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectRequest;
import com.max.backend.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.transaction.annotation.Transactional;

public interface ProjectService {

    Project findById(Long id);

    Page<Project> findAllByUserId(Pageable pageable, Long userId);

    Project create(CreateProjectRequest createProjectRequest);

    Project updateById(UpdateProjectRequest updateProjectRequest, Long id);

    Project deleteById(Long id);

    Project addUser(Long projectId, Long userId);

    Project removeUser(Long projectId, Long userId);

}
