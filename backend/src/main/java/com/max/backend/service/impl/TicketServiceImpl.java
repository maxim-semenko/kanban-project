package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateTicketRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.Ticket;
import com.max.backend.entity.User;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.exception.ResourseForbiddenException;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.exception.TicketException;
import com.max.backend.repository.PriorityRepository;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.ProjectStatusRepository;
import com.max.backend.repository.TicketRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.service.TicketService;
import com.max.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final PriorityRepository priorityRepository;
    private final ProjectStatusRepository projectStatusRepository;

    @Override
    public Ticket findById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Task not found!"));
    }

    @Override
    public Page<Ticket> findAllByProjectId(Pageable pageable, Long projectId) {
        return ticketRepository.findAllByProject(getProjectById(projectId), pageable);
    }

    @Override
    public Page<Ticket> findAllByUserId(Long userId, Pageable pageable) {
        User user = getUserById(userId);

        Page<Ticket> tickets = ticketRepository.findAll(pageable);

        return new PageImpl<>(
                tickets.stream()
                        .filter(ticket -> ticket.getExecutors().contains(user))
                        .collect(Collectors.toList()), tickets.getPageable(), tickets.getTotalElements());
    }

    @Override
    public Page<Priority> findAllTicketPriorities(Pageable pageable) {
        return priorityRepository.findAll(pageable);
    }

    @Override
    public Ticket create(CreateTicketRequest createTicketRequest) {
        ProjectStatus projectStatus = getProjectStatusById(createTicketRequest.getProjectStatusId());
        Long countTasksByProjectStatus = ticketRepository.countAllByProjectStatus(projectStatus);

        if (Objects.equals(countTasksByProjectStatus, projectStatus.getLimitTotalTicket())) {
            throw new TicketException("Can't add new task with this status because limit total task!");
        }

        Ticket task = Ticket.builder()
                .title(createTicketRequest.getTitle())
                .description(createTicketRequest.getDescription())
                .projectStatus(projectStatus)
                .creator(getUserById(createTicketRequest.getCreatorId()))
                .priority(getPriorityById(createTicketRequest.getPriorityId()))
                .project(getProjectById(createTicketRequest.getProjectId()))
                .expiryDate(createTicketRequest.getExpiryDate())
                .createdDate(new Date())
                .build();

        return ticketRepository.save(task);
    }

    @Override
    public Ticket updateById(UpdateTicketRequest updateTicketRequest, Long id) {
        Ticket ticket = findById(id);
        if (!ticket.getProject().getCreator().getEmail().equals(SecurityUtil.getCurrentUsername())) {
            throw new ResourseForbiddenException("Only project creator can update task!");
        }

        ticket.setTitle(updateTicketRequest.getTitle());
        ticket.setDescription(updateTicketRequest.getDescription());
        ticket.setPriority(getPriorityById(updateTicketRequest.getPriorityId()));
        ticket.setExpiryDate(updateTicketRequest.getExpiryDate());

        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket updateStatusById(UpdateTicketProjectStatusRequest updateProjectStatusRequest, Long id) {
        Ticket ticket = findById(id);
        System.out.println(SecurityUtil.getCurrentUsername());
        if (!ticket.getExecutors().contains(getUserByEmail(SecurityUtil.getCurrentUsername()))) {
            throw new ResourseForbiddenException("Only executor of ticket can update status!");
        }

        ProjectStatus projectStatus = updateProjectStatusRequest.getProjectStatus();
        Long countTasksByProjectStatus = ticketRepository.countAllByProjectStatus(projectStatus);

        if (Objects.equals(countTasksByProjectStatus, projectStatus.getLimitTotalTicket())) {
            throw new TicketException("Can't update ticket's project status because limit total task!");
        }
        ticket.setProjectStatus(projectStatus);
        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket deleteById(Long id) {
        Ticket ticket = findById(id);
        for (User user : ticket.getExecutors()) {
            ticket.getExecutors().remove(user);
        }
        ticketRepository.delete(ticket);
        return ticket;
    }

    @Override
    public Ticket addUser(Long taskId, Long userId) {
        Ticket ticket = findById(taskId);
        User existedUser = getUserById(userId);

        if (!ticket.getProject().getMembers().contains(existedUser)) {
            throw new ProjectMemberException("User is not a member of project!");
        }

        ticket.getExecutors()
                .stream()
                .filter(user -> user.equals(existedUser))
                .findFirst()
                .ifPresent(user -> {
                    throw new TicketException("User is already exists in task!");
                });

        ticket.getExecutors().add(existedUser);

        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket removeUser(Long taskId, Long userId) {
        Ticket ticket = findById(taskId);
        User existedUser = getUserById(userId);

        ticket.getExecutors()
                .stream()
                .filter(user -> user.equals(existedUser))
                .findFirst()
                .orElseThrow(() -> new TicketException("User not found in task!"));

        ticket.getExecutors().remove(existedUser);

        return ticketRepository.save(ticket);
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourseNotFoundException("User not found!"));
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourseNotFoundException("User not found!"));
    }

    private Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourseNotFoundException("Project not found!"));
    }

    private Priority getPriorityById(Long priorityId) {
        return priorityRepository.findById(priorityId)
                .orElseThrow(() -> new ResourseNotFoundException("Priority not found!"));
    }

    private ProjectStatus getProjectStatusById(Long projectStatusId) {
        return projectStatusRepository.findById(projectStatusId)
                .orElseThrow(() -> new ResourseNotFoundException("ProjectStatus not found!"));
    }
}
