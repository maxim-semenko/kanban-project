package com.max.backend.service.impl;

import com.max.backend.controller.dto.request.create.CreateProjectRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.Ticket;
import com.max.backend.entity.User;
import com.max.backend.exception.ProjectMemberException;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.repository.TicketRepository;
import com.max.backend.repository.UserRepository;
import com.max.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    @Override
    public Project findById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Project not found!"));
    }

    @Override
    public Page<Project> findAllByUserId(Pageable pageable, Long userId) {
        return projectRepository.findAllByUser(pageable, getUserById(userId));
    }

    @Override
    public Project create(CreateProjectRequest createProjectRequest) {
        User user = getUserById(createProjectRequest.getCreatorId());

        Project project = Project.builder()
                .name(createProjectRequest.getName())
                .description(createProjectRequest.getDescription())
                .creator(user)
                .members(List.of(user))
                .createdDate(new Date())
                .build();

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project updateById(UpdateProjectRequest updateProjectRequest, Long id) {
        Project project = findById(id);
        project.setName(updateProjectRequest.getName());
        project.setDescription(updateProjectRequest.getDescription());

        return projectRepository.save(project);
    }

    @Override
    public Project deleteById(Long id) {
        Project project = findById(id);
        projectRepository.delete(project);

        return project;
    }

    @Override
    public Project addUser(Long projectId, Long userId) {
        Project project = findById(projectId);
        User existedUser = getUserById(userId);

        if (project.getCreator().getId().equals(userId)) {
            throw new ProjectMemberException("Creator can't add yourself");
        }

        project.getMembers()
                .stream()
                .filter(user -> user.equals(existedUser))
                .findFirst()
                .ifPresent(user -> {
                    throw new ProjectMemberException("User is already exists in project!");
                });

        project.getMembers().add(existedUser);

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project removeUser(Long projectId, Long userId) {
        Project project = findById(projectId);
        User existedUser = getUserById(userId);

        if (project.getCreator().getId().equals(userId)) {
            throw new ProjectMemberException("Creator can't delete yourself");
        }

        project.getMembers()
                .stream()
                .filter(user -> user.equals(existedUser))
                .findFirst()
                .orElseThrow(() -> new ProjectMemberException("User not exists in project!"));

        project.getMembers().remove(existedUser);

        Page<Ticket> tickets = ticketRepository.findAllByProject(project, Pageable.unpaged());

        List<Ticket> ticketList = tickets
                .getContent()
                .stream()
                .filter(ticket -> ticket.getExecutors().contains(existedUser))
                .collect(Collectors.toList());
        ticketList.forEach(ticket -> ticket.getExecutors().remove(existedUser));

        ticketRepository.saveAll(ticketList);

        return projectRepository.save(project);
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourseNotFoundException("User not found!"));
    }

}
