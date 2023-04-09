package com.max.backend.controller;

import com.max.backend.controller.dto.request.create.CreateTicketRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateTicketRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Ticket;
import com.max.backend.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> findTicketById(@PathVariable Long id) {
        return new ResponseEntity<>(ticketService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/projects/{projectId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Ticket>> findAllTicketsByProjectId(@PathVariable Long projectId, Pageable pageable) {
        return new ResponseEntity<>(ticketService.findAllByProjectId(pageable, projectId), HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Page<Ticket>> findAllTicketsByUserId(@PathVariable Long userId, Pageable pageable) {
        return new ResponseEntity<>(ticketService.findAllByUserId(userId, pageable), HttpStatus.OK);
    }

    @GetMapping("/priorities")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Priority>> findAllPriorities(Pageable pageable) {
        return new ResponseEntity<>(ticketService.findAllTicketPriorities(pageable), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> createTicket(@RequestBody @Valid CreateTicketRequest request) {
        return new ResponseEntity<>(ticketService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> updateTicketById(@RequestBody @Valid UpdateTicketRequest request, @PathVariable Long id) {
        return new ResponseEntity<>(ticketService.updateById(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> deleteTicketById(@PathVariable Long id) {
        return new ResponseEntity<>(ticketService.deleteById(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/project-status")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> updateTicketStatusById(@RequestBody @Valid UpdateTicketProjectStatusRequest request,
                                                       @PathVariable Long id) {
        return new ResponseEntity<>(ticketService.updateStatusById(request, id), HttpStatus.OK);
    }

    @PutMapping("/{ticketId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Ticket> addUserToTicket(@PathVariable Long ticketId, @PathVariable Long userId) {
        return new ResponseEntity<>(ticketService.addUser(ticketId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/{ticketId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Ticket> removeUserFromTicket(@PathVariable Long ticketId, @PathVariable Long userId) {
        return new ResponseEntity<>(ticketService.removeUser(ticketId, userId), HttpStatus.OK);
    }

}
