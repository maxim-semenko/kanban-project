package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateLogTimeRequest;
import com.max.backend.controller.dto.request.update.UpdateLogTimeRequest;
import com.max.backend.entity.LogTime;
import com.max.backend.entity.Project;
import com.max.backend.entity.Ticket;
import com.max.backend.entity.User;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.LogTimeRepository;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.TicketRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.service.LogTimeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class LogTimeServiceImpl implements LogTimeService {

    private final LogTimeRepository logTimeRepository;
    private final TicketRepository ticketRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public LogTime findById(Long id) {
        return logTimeRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("LogTime not found!"));
    }

    @Override
    public Page<LogTime> findAllByTicketId(Long ticketId, Pageable pageable) {
        Ticket ticket = getTicketById(ticketId);
        return logTimeRepository.findAllByTicket(ticket, pageable);
    }

    @Override
    public Page<LogTime> findAllByProjectId(Long projectId, Pageable pageable) {
        Project project = getProjectById(projectId);
        return logTimeRepository.findAllByProject(project, pageable);
    }

    @Override
    public Page<LogTime> findAllByUserId(Long userId, Pageable pageable) {
        User user = getUserById(userId);
        return logTimeRepository.findAllByUser(user, pageable);
    }

    @Override
    public LogTime create(CreateLogTimeRequest createLogTimeRequest) {
        LogTime logTime = LogTime.builder()
                .description(createLogTimeRequest.getDescription())
                .ticket(getTicketById(createLogTimeRequest.getTicketId()))
                .user(getUserById(createLogTimeRequest.getUserId()))
                .startDate(createLogTimeRequest.getStartDate())
                .endDate(createLogTimeRequest.getEndDate())
                .build();

        return logTimeRepository.save(logTime);
    }

    @Override
    public LogTime updateById(UpdateLogTimeRequest updateLogTimeRequest, Long id) {
        LogTime logTime = findById(id);
        logTime.setDescription(updateLogTimeRequest.getDescription());
        logTime.setStartDate(updateLogTimeRequest.getStartDate());
        logTime.setEndDate(updateLogTimeRequest.getEndDate());

        return logTimeRepository.save(logTime);
    }

    @Override
    public LogTime deleteById(Long id) {
        LogTime logTime = findById(id);
        logTimeRepository.delete(logTime);
        return logTime;
    }

    private Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourseNotFoundException("Project not found!"));
    }

    private Ticket getTicketById(Long taskId) {
        return ticketRepository.findById(taskId)
                .orElseThrow(() -> new ResourseNotFoundException("Ticket not found!"));
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourseNotFoundException("User not found!"));
    }
}
