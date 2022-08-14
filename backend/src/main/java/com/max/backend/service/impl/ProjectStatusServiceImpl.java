package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectStatusRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.exception.ProjectStatusException;
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
        return projectStatusRepository.findAllByProject(pageable, getProjectById(projectId));
    }

    @Override
    public ProjectStatus findById(Long id) {
        return projectStatusRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("ProjectStatus not found!"));
    }

    @Override
    public ProjectStatus create(CreateProjectStatusRequest createProjectStatusRequest) {
        ProjectStatus projectStatus = ProjectStatus.builder()
                .name(createProjectStatusRequest.getName())
                .limitTotalTask(createProjectStatusRequest.getLimitTotalTask())
                .project(getProjectById(createProjectStatusRequest.getProjectId()))
                .build();

        return projectStatusRepository.save(projectStatus);
    }

    @Override
    public ProjectStatus updateById(UpdateProjectStatusRequest updateProjectStatusRequest, Long id) {
        ProjectStatus projectStatus = findById(id);
        if (projectStatus.getTasks().size() > updateProjectStatusRequest.getLimitTotalTask()) {
            throw new ProjectStatusException("The new limit of tasks can't be less then current size of task!");
        }
        projectStatus.setName(updateProjectStatusRequest.getName());
        projectStatus.setLimitTotalTask(updateProjectStatusRequest.getLimitTotalTask());

        return projectStatusRepository.save(projectStatus);
    }

    @Override
    public ProjectStatus deleteById(Long id) {
        ProjectStatus projectStatus = findById(id);
        projectStatusRepository.delete(projectStatus);
        return projectStatus;
    }

    private Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourseNotFoundException("Project not found!"));
    }

}
