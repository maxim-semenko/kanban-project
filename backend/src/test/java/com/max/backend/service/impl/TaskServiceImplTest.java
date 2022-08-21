package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateTaskRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTaskRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.Task;
import com.max.backend.entity.User;
import com.max.backend.entity.enums.PriorityEnum;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.exception.ResourseForbiddenException;
import com.max.backend.exception.TaskException;
import com.max.backend.repository.PriorityRepository;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.ProjectStatusRepository;
import com.max.backend.repository.TaskRepository;
import com.max.backend.repository.UserRepository;
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
import org.springframework.security.test.context.support.WithMockUser;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class TaskServiceImplTest {

    @InjectMocks
    private TaskServiceImpl taskService;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ProjectStatusRepository projectStatusRepository;

    @Mock
    private PriorityRepository priorityRepository;

    @Mock
    private UserRepository userRepository;


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
    void findById() {
        //given
        Long id = 1L;
        Task task = Task.builder()
                .id(id)
                .name("Name")
                .description("Description")
                .createdDate(new Date())
                .build();

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));

        assertEquals(task, taskService.findById(id));
    }

    @Test
    void findAllByProjectId() {
        //given
        Long id = 1L;
        when(projectRepository.findById(id)).thenReturn(Optional.of(new Project()));
        when(taskRepository.findAllByProject(any(PageRequest.class), any(Project.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), taskService.findAllByProjectId(PageRequest.of(0, 2), id));
    }

    @Test
    void findAllTaskPriorities() {
        when(priorityRepository.findAll(any(PageRequest.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), taskService.findAllTaskPriorities(PageRequest.of(0, 2)));
    }

    @Test
    void createWithSuccess() {
        //given
        CreateTaskRequest createTaskRequest = new CreateTaskRequest();
        createTaskRequest.setName("Name");
        createTaskRequest.setDescription("Description");
        createTaskRequest.setPriorityId(1L);
        createTaskRequest.setExpiryDate(new Date());
        createTaskRequest.setProjectId(1L);
        createTaskRequest.setProjectStatusId(1L);

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();
        ProjectStatus projectStatus = ProjectStatus.builder().build();

        Project project = Project.builder()
                .name("name")
                .description("description")
                .createdDate(new Date())
                .build();

        Task task = Task.builder()
                .id(1L)
                .project(project)
                .priority(priority)
                .projectStatus(projectStatus)
                .build();

        when(priorityRepository.findById(createTaskRequest.getPriorityId())).thenReturn(Optional.ofNullable(priority));
        when(projectStatusRepository.findById(createTaskRequest.getProjectStatusId())).thenReturn(Optional.ofNullable(projectStatus));
        when(projectRepository.findById(createTaskRequest.getProjectId())).thenReturn(Optional.ofNullable(project));
        when(taskRepository.save(any())).thenReturn(task);

        assertEquals(task, taskService.create(createTaskRequest));
    }

    @Test
    void createWithFailedThatLimitTotalTask() {
        //given
        CreateTaskRequest createTaskRequest = new CreateTaskRequest();
        createTaskRequest.setName("Name");
        createTaskRequest.setDescription("Description");
        createTaskRequest.setPriorityId(1L);
        createTaskRequest.setExpiryDate(new Date());
        createTaskRequest.setProjectId(1L);
        createTaskRequest.setProjectStatusId(1L);

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();
        ProjectStatus projectStatus = ProjectStatus.builder()
                .limitTotalTask(1L)
                .tasks(List.of(Task.builder().build()))
                .build();

        Project project = Project.builder()
                .name("name")
                .description("description")
                .createdDate(new Date())
                .build();

        when(priorityRepository.findById(createTaskRequest.getPriorityId())).thenReturn(Optional.ofNullable(priority));
        when(projectStatusRepository.findById(createTaskRequest.getProjectStatusId())).thenReturn(Optional.ofNullable(projectStatus));
        when(projectRepository.findById(createTaskRequest.getProjectId())).thenReturn(Optional.ofNullable(project));
        when(taskRepository.countAllByProjectStatus(projectStatus)).thenReturn(1L);

        assertThrows(TaskException.class, () -> taskService.create(createTaskRequest));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateByIdWithSuccess() {
        //given
        Long id = 1L;
        UpdateTaskRequest updateTaskRequest = new UpdateTaskRequest();
        updateTaskRequest.setName("Name");
        updateTaskRequest.setDescription("Description");
        updateTaskRequest.setPriorityId(1L);

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Task task = Task.builder()
                .name(updateTaskRequest.getName())
                .description(updateTaskRequest.getDescription())
                .project(Project.builder().creator(User.builder().email("admin").build()).build())
                .priority(priority)
                .build();

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));
        when(priorityRepository.findById(updateTaskRequest.getPriorityId())).thenReturn(Optional.of(priority));
        when(taskRepository.save(task)).thenReturn(task);

        assertEquals(task, taskService.updateById(updateTaskRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateByIdWithFailedThatForbidden() {
        //given
        Long id = 1L;
        UpdateTaskRequest updateTaskRequest = new UpdateTaskRequest();
        updateTaskRequest.setName("Name");
        updateTaskRequest.setDescription("Description");
        updateTaskRequest.setPriorityId(1L);

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Task task = Task.builder()
                .name(updateTaskRequest.getName())
                .description(updateTaskRequest.getDescription())
                .project(Project.builder().creator(User.builder().email("admin1").build()).build())
                .priority(priority)
                .build();

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));
        when(priorityRepository.findById(updateTaskRequest.getPriorityId())).thenReturn(Optional.of(priority));

        assertThrows(ResourseForbiddenException.class, () -> taskService.updateById(updateTaskRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateStatusByIdWithSuccess() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .name("test")
                .limitTotalTask(10L)
                .build();

        UpdateTaskProjectStatusRequest updateTaskProjectStatusRequest = new UpdateTaskProjectStatusRequest();
        updateTaskProjectStatusRequest.setProjectStatus(projectStatus);

        User user = User.builder().email("admin").build();
        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Task task = Task.builder()
                .name("name")
                .description("description")
                .project(Project.builder().creator(user).members(List.of(user)).build())
                .executors(List.of(user))
                .projectStatus(projectStatus)
                .priority(priority)
                .build();

        when(userRepository.findByEmail("admin")).thenReturn(Optional.of(user));
        when(taskRepository.findById(id)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        when(taskRepository.countAllByProjectStatus(projectStatus)).thenReturn(5L);

        assertEquals(task, taskService.updateStatusById(updateTaskProjectStatusRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateStatusByIdFailedThatForbidden() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .name("test")
                .limitTotalTask(10L)
                .build();

        UpdateTaskProjectStatusRequest updateTaskProjectStatusRequest = new UpdateTaskProjectStatusRequest();
        updateTaskProjectStatusRequest.setProjectStatus(projectStatus);

        User user = User.builder().email("admin1").build();
        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Task task = Task.builder()
                .name("name")
                .description("description")
                .project(Project.builder().creator(user).members(List.of(user)).build())
                .executors(List.of(User.builder().email("admin").build()))
                .projectStatus(projectStatus)
                .priority(priority)
                .build();

        when(userRepository.findByEmail("admin")).thenReturn(Optional.of(user));
        when(taskRepository.findById(id)).thenReturn(Optional.of(task));

        assertThrows(ResourseForbiddenException.class,
                () -> taskService.updateStatusById(updateTaskProjectStatusRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateStatusByIdWithFailedThatLimitTotalTask() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .name("test")
                .limitTotalTask(5L)
                .build();

        UpdateTaskProjectStatusRequest updateTaskProjectStatusRequest = new UpdateTaskProjectStatusRequest();
        updateTaskProjectStatusRequest.setProjectStatus(projectStatus);

        User user = User.builder().email("admin").build();
        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Task task = Task.builder()
                .name("name")
                .description("description")
                .project(Project.builder().creator(user).members(List.of(user)).build())
                .executors(List.of(user))
                .projectStatus(projectStatus)
                .priority(priority)
                .build();

        when(userRepository.findByEmail("admin")).thenReturn(Optional.of(user));
        when(taskRepository.findById(id)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        when(taskRepository.countAllByProjectStatus(projectStatus)).thenReturn(5L);

        assertThrows(TaskException.class,
                () -> taskService.updateStatusById(updateTaskProjectStatusRequest, id));
    }

    @Test
    void deleteById() {
        //given
        Long id = 1L;

        Task task = Task.builder()
                .name("Name")
                .createdDate(new Date())
                .build();

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));

        assertEquals(task, taskService.deleteById(id));
    }

    @Test
    void addUserWithSuccess() {
        //given
        Long userId = 1L;
        Long taskId = 2L;
        Long projectId = 3L;

        User creator = User.builder().id(3L).build();
        User addedUser = User.builder().id(userId).build();

        List<User> membersProject = new ArrayList<>();
        membersProject.add(creator);
        membersProject.add(addedUser);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(membersProject)
                .build();

        List<User> executors = new ArrayList<>();
        executors.add(creator);
        Task task = Task.builder()
                .id(taskId)
                .project(project)
                .executors(executors)
                .build();

        Task updatedTask = Task.builder()
                .id(taskId)
                .executors(List.of(creator, addedUser))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(updatedTask);

        assertEquals(updatedTask, taskService.addUser(taskId, userId));
    }

    @Test
    void addUserWithSuccessWithFailedThatUserIsNotProjectMember() {
        //given
        Long userId = 1L;
        Long taskId = 2L;
        Long projectId = 3L;

        User creator = User.builder().id(3L).build();
        User addedUser = User.builder().id(userId).build();

        List<User> membersProject = new ArrayList<>();
        membersProject.add(creator);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(membersProject)
                .build();

        List<User> executors = new ArrayList<>();
        executors.add(creator);
        Task task = Task.builder()
                .id(taskId)
                .project(project)
                .executors(executors)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        assertThrows(ProjectMemberException.class, () -> taskService.addUser(taskId, userId));
    }

    @Test
    void addUserWithSuccessWithFailedThatUserIsAlreadyExistInTask() {
        //given
        Long userId = 1L;
        Long taskId = 2L;
        Long projectId = 3L;

        User creator = User.builder().id(3L).build();
        User addedUser = User.builder().id(userId).build();

        List<User> membersProject = new ArrayList<>();
        membersProject.add(creator);
        membersProject.add(addedUser);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(membersProject)
                .build();

        List<User> executors = new ArrayList<>();
        executors.add(creator);
        executors.add(addedUser);
        Task task = Task.builder()
                .id(taskId)
                .project(project)
                .executors(executors)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        assertThrows(TaskException.class, () -> taskService.addUser(taskId, userId));
    }

    @Test
    void removeUserWithSuccess() {
        //given
        Long userId = 1L;
        Long taskId = 2L;
        Long projectId = 3L;

        User creator = User.builder().id(3L).build();
        User removedUser = User.builder().id(userId).build();

        List<User> membersProject = new ArrayList<>();
        membersProject.add(creator);
        membersProject.add(removedUser);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(membersProject)
                .build();

        List<User> executors = new ArrayList<>();
        executors.add(creator);
        executors.add(removedUser);
        Task task = Task.builder()
                .id(taskId)
                .project(project)
                .executors(executors)
                .build();

        Task updatedTask = Task.builder()
                .id(taskId)
                .executors(List.of(creator))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(removedUser));
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(updatedTask);

        assertEquals(updatedTask, taskService.removeUser(taskId, userId));
    }

    @Test
    void removeUserWithFailedThatUserIsNotInTask() {
        //given
        Long userId = 1L;
        Long taskId = 2L;
        Long projectId = 3L;

        User creator = User.builder().id(3L).build();
        User removedUser = User.builder().id(userId).build();

        List<User> membersProject = new ArrayList<>();
        membersProject.add(creator);
        membersProject.add(removedUser);

        Project project = Project.builder()
                .id(projectId)
                .creator(creator)
                .members(membersProject)
                .build();

        List<User> executors = new ArrayList<>();
        executors.add(creator);
        Task task = Task.builder()
                .id(taskId)
                .project(project)
                .executors(executors)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(removedUser));
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        assertThrows(TaskException.class, () -> taskService.removeUser(taskId, userId));
    }
}