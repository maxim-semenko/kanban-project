package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateProjectRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.User;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceImplTest {

    @InjectMocks
    private ProjectServiceImpl projectService;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @Test
    void findById() {
        //given
        Long id = 1L;
        Project project = Project.builder()
                .id(id)
                .name("Name")
                .description("Description")
                .createdDate(new Date())
                .build();

        when(projectRepository.findById(id)).thenReturn(Optional.of(project));

        assertEquals(project, projectService.findById(id));
    }

    @Test
    void findAllByUserId() {
        //given
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.of(new User()));
        when(projectRepository.findAllByUser(any(PageRequest.class), any(User.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), projectService.findAllByUserId(PageRequest.of(0, 2), id));
    }

    @Test
    void create() {
        //given
        CreateProjectRequest createProjectRequest = new CreateProjectRequest();
        createProjectRequest.setName("Name");
        createProjectRequest.setDescription("Description");
        createProjectRequest.setCreatorId(1L);

        User user = User.builder()
                .id(createProjectRequest.getCreatorId())
                .email("email@gmail.com")
                .build();

        Project project = Project.builder()
                .name(createProjectRequest.getName())
                .description(createProjectRequest.getDescription())
                .createdDate(new Date())
                .creator(user)
                .members(List.of(user))
                .build();


        when(userRepository.findById(createProjectRequest.getCreatorId())).thenReturn(Optional.of(user));
        when(projectRepository.save(any())).thenReturn(project);

        assertEquals(project, projectService.create(createProjectRequest));
    }

    @Test
    void updateById() {
        //given
        Long id = 1L;
        UpdateProjectRequest updateProjectRequest = new UpdateProjectRequest();
        updateProjectRequest.setName("Name");
        updateProjectRequest.setDescription("Description");

        Project project = Project.builder()
                .name(updateProjectRequest.getName())
                .description(updateProjectRequest.getDescription())
                .createdDate(new Date())
                .creator(new User())
                .build();

        when(projectRepository.findById(id)).thenReturn(Optional.of(project));
        when(projectRepository.save(any())).thenReturn(project);

        assertEquals(project, projectService.updateById(updateProjectRequest, id));
    }

    @Test
    void deleteById() {
        //given
        Long id = 1L;

        Project project = Project.builder()
                .name("Name")
                .description("Description")
                .createdDate(new Date())
                .creator(new User())
                .build();

        when(projectRepository.findById(id)).thenReturn(Optional.of(project));

        assertEquals(project, projectService.deleteById(id));
    }

    @DisplayName("Test for add user to project with success")
    @Test
    void addUserWithSuccess() {
        //given
        Long userId = 1L;
        Long projectId = 2L;

        User creator = User.builder().id(3L).build();
        User addedUser = User.builder().id(userId).build();
        List<User> members = new ArrayList<>();
        members.add(creator);
        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(members)
                .build();

        Project updatedProject = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(List.of(creator, addedUser))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectRepository.save(project)).thenReturn(updatedProject);

        assertEquals(updatedProject, projectService.addUser(projectId, userId));
    }

    @DisplayName("Test for add user to project with failed that creator cant add yourself")
    @Test
    void addUserWithFailedThatCreatorCantAddYourSelf() {
        //given
        Long userId = 1L;
        Long projectId = 2L;

        User creator = User.builder().id(userId).build();
        User addedUser = User.builder().id(userId).build();
        List<User> members = new ArrayList<>();
        members.add(creator);
        members.add(addedUser);
        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(members)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        assertThrows(ProjectMemberException.class, () -> projectService.addUser(projectId, userId));
    }

    @DisplayName("Test for add user to project with failed that user is not in project members")
    @Test
    void addUserWithFailedThatUserIsNotProjectMember() {
        //given
        Long userId = 1L;
        Long projectId = 2L;

        User creator = User.builder().id(3L).build();
        User addedUser = User.builder().id(userId).build();
        List<User> members = new ArrayList<>();
        members.add(creator);
        members.add(addedUser);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(members)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        assertThrows(ProjectMemberException.class, () -> projectService.addUser(projectId, userId));
    }

    @DisplayName("Test for remove user from project with success")
    @Test
    void removeUserWithSuccess() {
        //given
        Long userId = 1L;
        Long projectId = 2L;

        User creator = User.builder().id(3L).build();
        User removedUser = User.builder().id(userId).build();
        List<User> members = new ArrayList<>();
        members.add(creator);
        members.add(removedUser);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(members)
                .build();

        Project updatedProject = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(List.of(creator))
                .build();

        //when
        when(userRepository.findById(userId)).thenReturn(Optional.of(removedUser));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectRepository.save(project)).thenReturn(updatedProject);

        assertEquals(updatedProject, projectService.removeUser(projectId, userId));
    }

    @DisplayName("Test for remove user from project with failed that creator cant remove yourself")
    @Test
    void removeUserWithFailedThatCreatorCantRemoveYourself() {
        //given
        Long userId = 1L;
        Long projectId = 2L;

        User creator = User.builder().id(userId).build();
        User removedUser = User.builder().id(userId).build();
        List<User> members = new ArrayList<>();
        members.add(creator);
        members.add(removedUser);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(members)
                .build();

        //when
        when(userRepository.findById(userId)).thenReturn(Optional.of(removedUser));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        assertThrows(ProjectMemberException.class, () -> projectService.removeUser(projectId, userId));
    }

    @DisplayName("Test for remove user from project with failed that user is not project member")
    @Test
    void removeUserWithFailedThatUserIsNotProjectMember() {
        //given
        Long userId = 1L;
        Long projectId = 2L;

        User creator = User.builder().id(3L).build();
        User removedUser = User.builder().id(userId).build();
        List<User> members = new ArrayList<>();
        members.add(creator);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(members)
                .build();

        //when
        when(userRepository.findById(userId)).thenReturn(Optional.of(removedUser));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        assertThrows(ProjectMemberException.class, () -> projectService.removeUser(projectId, userId));
    }
}