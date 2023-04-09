package com.max.backend.service;

import com.max.backend.controller.dto.request.create.CreateTicketRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketRequest;
import com.max.backend.entity.LogTime;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TicketService {

    Ticket findById(Long id);

    Page<Ticket> findAllByProjectId(Pageable pageable, Long projectId);

    Page<Ticket> findAllByUserId(Long userId, Pageable pageable);

    Page<Priority> findAllTicketPriorities(Pageable pageable);

    Ticket create(CreateTicketRequest createTicketRequest);

    Ticket updateById(UpdateTicketRequest updateTicketRequest, Long id);

    Ticket updateStatusById(UpdateTicketProjectStatusRequest updateProjectStatusRequest, Long id);

    Ticket deleteById(Long id);

    Ticket addUser(Long TicketId, Long userId);

    Ticket removeUser(Long TicketId, Long userId);
}
