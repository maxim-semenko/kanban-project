package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateProjectRequest;
import com.max.backend.controller.dto.request.create.CreateProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectStatusRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.Task;
import com.max.backend.entity.User;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.exception.ProjectStatusException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.ProjectStatusRepository;
import com.max.backend.util.SecurityUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ProjectStatusServiceImplTest {

    @InjectMocks
    private ProjectStatusServiceImpl projectStatusService;

    @Mock
    private ProjectStatusRepository projectStatusRepository;

    @Mock
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Authentication authentication = Mockito.mock(Authentication.class);
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            SecurityContextHolder.setContext(securityContext);
            when(securityContext.getAuthentication()).thenReturn(authentication);
            when(SecurityUtil.getCurrentUsername()).thenReturn("admin");
        }
    }

    @Test
    void findAllByProjectId() {
        //given
        Long projectId = 1L;
        Project project = Project.builder().id(projectId).build();
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectStatusRepository.findAllByProject(any(PageRequest.class), eq(project))).thenReturn(Page.empty());

        assertEquals(Page.empty(), projectStatusService.findAllByProjectId(PageRequest.of(0, 2), projectId));
    }

    @Test
    void findById() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .id(id)
                .name("Name")
                .build();

        when(projectStatusRepository.findById(id)).thenReturn(Optional.of(projectStatus));

        assertEquals(projectStatus, projectStatusService.findById(id));
    }

    @Test
    void create() {
        //given
        CreateProjectStatusRequest createProjectStatusRequest = new CreateProjectStatusRequest();
        createProjectStatusRequest.setName("Name");
        createProjectStatusRequest.setLimitTotalTask(10L);
        createProjectStatusRequest.setProjectId(1L);

        User user = User.builder()
                .id(2L)
                .email("email@gmail.com")
                .build();

        Project project = Project.builder()
                .id(createProjectStatusRequest.getProjectId())
                .creator(user)
                .members(List.of(user))
                .build();

        ProjectStatus projectStatus = ProjectStatus.builder()
                .name(project.getName())
                .limitTotalTask(createProjectStatusRequest.getLimitTotalTask())
                .project(project)
                .build();

        when(projectRepository.findById(createProjectStatusRequest.getProjectId())).thenReturn(Optional.of(project));
        when(projectStatusRepository.save(any())).thenReturn(projectStatus);

        assertEquals(projectStatus, projectStatusService.create(createProjectStatusRequest));
    }

    @Test
    void updateByIdWithSuccess() {
        //given
        Long id = 1L;
        UpdateProjectStatusRequest updateProjectStatusRequest = new UpdateProjectStatusRequest();
        updateProjectStatusRequest.setName("Name");
        updateProjectStatusRequest.setLimitTotalTask(10L);

        ProjectStatus projectStatus = ProjectStatus.builder()
                .name(updateProjectStatusRequest.getName())
                .limitTotalTask(updateProjectStatusRequest.getLimitTotalTask())
                .build();

        when(projectStatusRepository.findById(id)).thenReturn(Optional.of(projectStatus));
        when(projectStatusRepository.save(any())).thenReturn(projectStatus);

        assertEquals(projectStatus, projectStatusService.updateById(updateProjectStatusRequest, id));
    }

    @Test
    void updateByIdWithFailedThatTaskLimit() {
        //given
        Long id = 1L;
        UpdateProjectStatusRequest updateProjectStatusRequest = new UpdateProjectStatusRequest();
        updateProjectStatusRequest.setName("Name");
        updateProjectStatusRequest.setLimitTotalTask(1L);

        ProjectStatus projectStatus = ProjectStatus.builder()
                .name(updateProjectStatusRequest.getName())
                .limitTotalTask(updateProjectStatusRequest.getLimitTotalTask())
                .tasks(List.of(Task.builder().id(1L).build(), Task.builder().id(2L).build()))
                .build();

        when(projectStatusRepository.findById(id)).thenReturn(Optional.of(projectStatus));

        assertThrows(ProjectStatusException.class,
                () -> projectStatusService.updateById(updateProjectStatusRequest, id));
    }

    @Test
    void deleteById() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .id(id)
                .name("Name")
                .limitTotalTask(10L)
                .build();

        when(projectStatusRepository.findById(id)).thenReturn(Optional.of(projectStatus));

        assertEquals(projectStatus, projectStatusService.deleteById(id));
    }
}