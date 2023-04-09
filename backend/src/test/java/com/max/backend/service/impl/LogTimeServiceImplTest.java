package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateLogTimeRequest;
import com.max.backend.controller.dto.request.create.CreateProjectRequest;
import com.max.backend.controller.dto.request.update.UpdateLogTimeRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectRequest;
import com.max.backend.entity.LogTime;
import com.max.backend.entity.Project;
import com.max.backend.entity.Ticket;
import com.max.backend.entity.User;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.repository.LogTimeRepository;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.TicketRepository;
import com.max.backend.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LogTimeServiceImplTest {

    @InjectMocks
    private LogTimeServiceImpl logTimeService;

    @Mock
    private LogTimeRepository logTimeRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TicketRepository ticketRepository;

    @Test
    void findById() {
        //given
        Long id = 1L;
        LogTime logTime = LogTime.builder()
                .id(id)
                .description("test")
                .startDate(new Date())
                .endDate(new Date())
                .ticket(Ticket.builder().build())
                .user(User.builder().build())
                .build();

        when(logTimeRepository.findById(id)).thenReturn(Optional.of(logTime));

        assertEquals(logTime, logTimeService.findById(id));
    }

    @Test
    void findAllByUserId() {
        //given
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.of(new User()));
        when(projectRepository.findAllByUser(any(PageRequest.class), any(User.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), logTimeService.findAllByUserId(id, PageRequest.of(0, 2)));
    }

    @Test
    void findAllByProjectId() {
        //given
        Long id = 1L;
        when(projectRepository.findById(id)).thenReturn(Optional.of(new Project()));
        when(logTimeRepository.findAllByProject(any(Project.class), any(PageRequest.class) )).thenReturn(Page.empty());

        assertEquals(Page.empty(), logTimeService.findAllByProjectId(id, PageRequest.of(0, 2)));
    }

    @Test
    void findAllByTicketId() {
        //given
        Long id = 1L;
        when(ticketRepository.findById(id)).thenReturn(Optional.of(new Ticket()));
        when(logTimeRepository.findAllByTicket(any(Ticket.class), any(PageRequest.class))).thenReturn(Page.empty());

        assertEquals(Page.empty(), logTimeService.findAllByTicketId(id, PageRequest.of(0, 2)));
    }

    @Test
    void create() {
        //given
        CreateLogTimeRequest createLogTimeRequest = new CreateLogTimeRequest();
        createLogTimeRequest.setDescription("Description");
        createLogTimeRequest.setStartDate(new Date());
        createLogTimeRequest.setEndDate(new Date());
        createLogTimeRequest.setUserId(1L);
        createLogTimeRequest.setTicketId(1L);

        User user = User.builder()
                .id(createLogTimeRequest.getUserId())
                .email("email@gmail.com")
                .build();

        Ticket ticket = Ticket.builder()
                .id(createLogTimeRequest.getTicketId())
                .build();


        LogTime logTime = LogTime.builder()
                .id(1L)
                .description("test")
                .startDate(new Date())
                .endDate(new Date())
                .ticket(ticket)
                .user(user)
                .build();


        when(userRepository.findById(createLogTimeRequest.getUserId())).thenReturn(Optional.of(user));
        when(ticketRepository.findById(createLogTimeRequest.getTicketId())).thenReturn(Optional.of(ticket));
        when(logTimeRepository.save(any())).thenReturn(logTime);

        assertEquals(logTime, logTimeService.create(createLogTimeRequest));
    }

    @Test
    void updateById() {
        //given
        Long id = 1L;
        UpdateLogTimeRequest updateLogTimeRequest = new UpdateLogTimeRequest();
        updateLogTimeRequest.setDescription("Description");
        updateLogTimeRequest.setStartDate(new Date());
        updateLogTimeRequest.setEndDate(new Date());

        LogTime logTime = LogTime.builder()
                .id(id)
                .description(updateLogTimeRequest.getDescription())
                .startDate(updateLogTimeRequest.getStartDate())
                .endDate(updateLogTimeRequest.getEndDate())
                .ticket(Ticket.builder().build())
                .user(User.builder().build())
                .build();


        when(logTimeRepository.findById(id)).thenReturn(Optional.of(logTime));
        when(logTimeRepository.save(any())).thenReturn(logTime);

        assertEquals(logTime, logTimeService.updateById(updateLogTimeRequest, id));
    }

    @Test
    void deleteById() {
        //given
        Long id = 1L;

        LogTime logTime = LogTime.builder()
                .id(id)
                .description("test")
                .startDate(new Date())
                .endDate(new Date())
                .ticket(Ticket.builder().build())
                .user(User.builder().build())
                .build();

        when(logTimeRepository.findById(id)).thenReturn(Optional.of(logTime));

        assertEquals(logTime, logTimeService.deleteById(id));
    }

}
