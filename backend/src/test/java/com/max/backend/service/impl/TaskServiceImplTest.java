package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateTicketRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.Ticket;
import com.max.backend.entity.User;
import com.max.backend.entity.enums.PriorityEnum;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.exception.ResourseForbiddenException;
import com.max.backend.exception.TicketException;
import com.max.backend.repository.PriorityRepository;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.ProjectStatusRepository;
import com.max.backend.repository.TicketRepository;
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
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class TicketServiceImplTest {

    @InjectMocks
    private TicketServiceImpl TicketService;

    @Mock
    private TicketRepository ticketRepository;

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
        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .id(id)
                .title("Name")
                .description("Description")
                .createdDate(new Date())
                .build();

        when(ticketRepository.findById(id)).thenReturn(Optional.of(Ticket));

        assertEquals(Ticket, TicketService.findById(id));
    }

    @Test
    void findAllByProjectId() {
        //given
        Long id = 1L;
        when(projectRepository.findById(id)).thenReturn(Optional.of(new Project()));
        when(ticketRepository.findAllByProject(any(Project.class), any(PageRequest.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), TicketService.findAllByProjectId(PageRequest.of(0, 2), id));
    }

    @Test
    void findAllTicketPriorities() {
        when(priorityRepository.findAll(any(PageRequest.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), TicketService.findAllTicketPriorities(PageRequest.of(0, 2)));
    }

    @Test
    void createWithSuccess() {
        //given
        CreateTicketRequest createTicketRequest = new CreateTicketRequest();
        createTicketRequest.setTitle("Name");
        createTicketRequest.setDescription("Description");
        createTicketRequest.setPriorityId(1L);
        createTicketRequest.setExpiryDate(new Date());
        createTicketRequest.setCreatorId(1L);
        createTicketRequest.setProjectId(1L);
        createTicketRequest.setProjectStatusId(1L);

        User user = User.builder().build();

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();
        ProjectStatus projectStatus = ProjectStatus.builder().build();

        Project project = Project.builder()
                .name("name")
                .description("description")
                .createdDate(new Date())
                .build();

        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .id(1L)
                .project(project)
                .priority(priority)
                .projectStatus(projectStatus)
                .build();

        when(userRepository.findById(createTicketRequest.getCreatorId())).thenReturn(Optional.ofNullable(user));
        when(priorityRepository.findById(createTicketRequest.getPriorityId())).thenReturn(Optional.ofNullable(priority));
        when(projectStatusRepository.findById(createTicketRequest.getProjectStatusId())).thenReturn(Optional.ofNullable(projectStatus));
        when(projectRepository.findById(createTicketRequest.getProjectId())).thenReturn(Optional.ofNullable(project));
        when(ticketRepository.save(any())).thenReturn(Ticket);

        assertEquals(Ticket, TicketService.create(createTicketRequest));
    }

    @Test
    void createWithFailedThatLimitTotalTicket() {
        //given
        CreateTicketRequest createTicketRequest = new CreateTicketRequest();
        createTicketRequest.setTitle("Name");
        createTicketRequest.setDescription("Description");
        createTicketRequest.setPriorityId(1L);
        createTicketRequest.setExpiryDate(new Date());
        createTicketRequest.setProjectId(1L);
        createTicketRequest.setProjectStatusId(1L);

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();
        ProjectStatus projectStatus = ProjectStatus.builder()
                .limitTotalTicket(1L)
                .tickets(List.of(Ticket.builder().build()))
                .build();

        Project project = Project.builder()
                .name("name")
                .description("description")
                .createdDate(new Date())
                .build();

        when(priorityRepository.findById(createTicketRequest.getPriorityId())).thenReturn(Optional.ofNullable(priority));
        when(projectStatusRepository.findById(createTicketRequest.getProjectStatusId())).thenReturn(Optional.ofNullable(projectStatus));
        when(projectRepository.findById(createTicketRequest.getProjectId())).thenReturn(Optional.ofNullable(project));
        when(ticketRepository.countAllByProjectStatus(projectStatus)).thenReturn(1L);

        assertThrows(TicketException.class, () -> TicketService.create(createTicketRequest));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateByIdWithSuccess() {
        //given
        Long id = 1L;
        UpdateTicketRequest updateTicketRequest = new UpdateTicketRequest();
        updateTicketRequest.setTitle("Name");
        updateTicketRequest.setDescription("Description");
        updateTicketRequest.setPriorityId(1L);

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .title(updateTicketRequest.getTitle())
                .description(updateTicketRequest.getDescription())
                .project(Project.builder().creator(User.builder().email("admin").build()).build())
                .priority(priority)
                .build();

        when(ticketRepository.findById(id)).thenReturn(Optional.of(Ticket));
        when(priorityRepository.findById(updateTicketRequest.getPriorityId())).thenReturn(Optional.of(priority));
        when(ticketRepository.save(Ticket)).thenReturn(Ticket);

        assertEquals(Ticket, TicketService.updateById(updateTicketRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateByIdWithFailedThatForbidden() {
        //given
        Long id = 1L;
        UpdateTicketRequest updateTicketRequest = new UpdateTicketRequest();
        updateTicketRequest.setTitle("Name");
        updateTicketRequest.setDescription("Description");
        updateTicketRequest.setPriorityId(1L);

        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .title(updateTicketRequest.getTitle())
                .description(updateTicketRequest.getDescription())
                .project(Project.builder().creator(User.builder().email("admin1").build()).build())
                .priority(priority)
                .build();

        when(ticketRepository.findById(id)).thenReturn(Optional.of(Ticket));
        when(priorityRepository.findById(updateTicketRequest.getPriorityId())).thenReturn(Optional.of(priority));

        assertThrows(ResourseForbiddenException.class, () -> TicketService.updateById(updateTicketRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateStatusByIdWithSuccess() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .name("test")
                .limitTotalTicket(10L)
                .build();

        UpdateTicketProjectStatusRequest updateTicketProjectStatusRequest = new UpdateTicketProjectStatusRequest();
        updateTicketProjectStatusRequest.setProjectStatus(projectStatus);

        User user = User.builder().email("admin").build();
        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .title("name")
                .description("description")
                .project(Project.builder().creator(user).members(List.of(user)).build())
                .executors(Set.of(user))
                .projectStatus(projectStatus)
                .priority(priority)
                .build();

        when(userRepository.findByEmail("admin")).thenReturn(Optional.of(user));
        when(ticketRepository.findById(id)).thenReturn(Optional.of(Ticket));
        when(ticketRepository.save(Ticket)).thenReturn(Ticket);
        when(ticketRepository.countAllByProjectStatus(projectStatus)).thenReturn(5L);

        assertEquals(Ticket, TicketService.updateStatusById(updateTicketProjectStatusRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateStatusByIdFailedThatForbidden() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .name("test")
                .limitTotalTicket(10L)
                .build();

        UpdateTicketProjectStatusRequest updateTicketProjectStatusRequest = new UpdateTicketProjectStatusRequest();
        updateTicketProjectStatusRequest.setProjectStatus(projectStatus);

        User user = User.builder().email("admin1").build();
        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .title("name")
                .description("description")
                .project(Project.builder().creator(user).members(List.of(user)).build())
                .executors(Set.of(User.builder().email("admin").build()))
                .projectStatus(projectStatus)
                .priority(priority)
                .build();

        when(userRepository.findByEmail("admin")).thenReturn(Optional.of(user));
        when(ticketRepository.findById(id)).thenReturn(Optional.of(Ticket));

        assertThrows(ResourseForbiddenException.class,
                () -> TicketService.updateStatusById(updateTicketProjectStatusRequest, id));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateStatusByIdWithFailedThatLimitTotalTicket() {
        //given
        Long id = 1L;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .name("test")
                .limitTotalTicket(5L)
                .build();

        UpdateTicketProjectStatusRequest updateTicketProjectStatusRequest = new UpdateTicketProjectStatusRequest();
        updateTicketProjectStatusRequest.setProjectStatus(projectStatus);

        User user = User.builder().email("admin").build();
        Priority priority = Priority.builder().name(PriorityEnum.LOW).build();

        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .title("name")
                .description("description")
                .project(Project.builder().creator(user).members(List.of(user)).build())
                .executors(Set.of(user))
                .projectStatus(projectStatus)
                .priority(priority)
                .build();

        when(userRepository.findByEmail("admin")).thenReturn(Optional.of(user));
        when(ticketRepository.findById(id)).thenReturn(Optional.of(Ticket));
        when(ticketRepository.save(Ticket)).thenReturn(Ticket);
        when(ticketRepository.countAllByProjectStatus(projectStatus)).thenReturn(5L);

        assertThrows(TicketException.class,
                () -> TicketService.updateStatusById(updateTicketProjectStatusRequest, id));
    }

    @Test
    void deleteById() {
        //given
        Long id = 1L;

        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .title("Name")
                .createdDate(new Date())
                .build();

        when(ticketRepository.findById(id)).thenReturn(Optional.of(Ticket));

        assertEquals(Ticket, TicketService.deleteById(id));
    }

    @Test
    void addUserWithSuccess() {
        //given
        Long userId = 1L;
        Long TicketId = 2L;
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

        Set<User> executors = new HashSet<>();
        executors.add(creator);
        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .id(TicketId)
                .project(project)
                .executors(executors)
                .build();

        Ticket updatedTicket = com.max.backend.entity.Ticket.builder()
                .id(TicketId)
                .executors(Set.of(creator, addedUser))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(ticketRepository.findById(TicketId)).thenReturn(Optional.of(Ticket));
        when(ticketRepository.save(Ticket)).thenReturn(updatedTicket);

        assertEquals(updatedTicket, TicketService.addUser(TicketId, userId));
    }

    @Test
    void addUserWithSuccessWithFailedThatUserIsNotProjectMember() {
        //given
        Long userId = 1L;
        Long TicketId = 2L;
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

        Set<User> executors = new HashSet<>();
        executors.add(creator);
        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .id(TicketId)
                .project(project)
                .executors(executors)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(ticketRepository.findById(TicketId)).thenReturn(Optional.of(Ticket));

        assertThrows(ProjectMemberException.class, () -> TicketService.addUser(TicketId, userId));
    }

    @Test
    void addUserWithSuccessWithFailedThatUserIsAlreadyExistInTicket() {
        //given
        Long userId = 1L;
        Long TicketId = 2L;
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

        Set<User> executors = new HashSet<>();
        executors.add(creator);
        executors.add(addedUser);
        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .id(TicketId)
                .project(project)
                .executors(executors)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(addedUser));
        when(ticketRepository.findById(TicketId)).thenReturn(Optional.of(Ticket));

        assertThrows(TicketException.class, () -> TicketService.addUser(TicketId, userId));
    }

    @Test
    void removeUserWithSuccess() {
        //given
        Long userId = 1L;
        Long TicketId = 2L;
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

        Set<User> executors = new HashSet<>();
        executors.add(creator);
        executors.add(removedUser);
        Ticket Ticket = com.max.backend.entity.Ticket.builder()
                .id(TicketId)
                .project(project)
                .executors(executors)
                .build();

        Ticket updatedTicket = com.max.backend.entity.Ticket.builder()
                .id(TicketId)
                .executors(Set.of(creator))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(removedUser));
        when(ticketRepository.findById(TicketId)).thenReturn(Optional.of(Ticket));
        when(ticketRepository.save(Ticket)).thenReturn(updatedTicket);

        assertEquals(updatedTicket, TicketService.removeUser(TicketId, userId));
    }

    @Test
    void removeUserWithFailedThatUserIsNotInTicket() {
        //given
        Long userId = 1L;
        Long TicketId = 2L;
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

        Set<User> executors = new HashSet<>();
        executors.add(creator);
        Ticket ticket = Ticket.builder()
                .id(TicketId)
                .project(project)
                .executors(executors)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(removedUser));
        when(ticketRepository.findById(TicketId)).thenReturn(Optional.of(ticket));

        assertThrows(TicketException.class, () -> TicketService.removeUser(TicketId, userId));
    }
}
