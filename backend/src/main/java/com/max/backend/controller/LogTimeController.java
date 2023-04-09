package com.max.backend.controller;

import com.max.backend.controller.dto.request.create.CreateLogTimeRequest;
import com.max.backend.controller.dto.request.update.UpdateLogTimeRequest;
import com.max.backend.entity.LogTime;
import com.max.backend.service.LogTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/log-times")
@RequiredArgsConstructor
public class LogTimeController {

    private final LogTimeService logTimeService;

    @GetMapping("/tickets/{ticketId}")
    @PreAuthorize("hasRole('USER')")
    @PostAuthorize("@mySecurityService.userIsMemberOfProject(returnObject.body.toList().get(0).ticket.project)")
    public ResponseEntity<Page<LogTime>> findAllLogTimesByTaskId(@PathVariable Long ticketId, Pageable pageable) {
        return new ResponseEntity<>(logTimeService.findAllByTicketId(ticketId, pageable), HttpStatus.OK);
    }

    @GetMapping("/projects/{projectId}")
    @PreAuthorize("hasRole('USER')")
    @PostAuthorize("@mySecurityService.userIsMemberOfProject(returnObject.body.toList().get(0).ticket.project)")
    public ResponseEntity<Page<LogTime>> findAllLogTimesByProjectId(@PathVariable Long projectId, Pageable pageable) {
        return new ResponseEntity<>(logTimeService.findAllByProjectId(projectId, pageable), HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Page<LogTime>> findAllLogTimesByUserId(@PathVariable Long userId, Pageable pageable) {
        return new ResponseEntity<>(logTimeService.findAllByUserId(userId, pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @PostAuthorize("@mySecurityService.userIsMemberOfProject(returnObject.body.ticket.project)")
    public ResponseEntity<LogTime> findLogTimeById(@PathVariable Long id) {
        return new ResponseEntity<>(logTimeService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<LogTime> createLogTime(@RequestBody @Valid CreateLogTimeRequest request) {
        return new ResponseEntity<>(logTimeService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') && @mySecurityService.isOwnerOfLogTime(#id)")
    public ResponseEntity<LogTime> updateLogTimeById(@RequestBody @Valid UpdateLogTimeRequest request,
                                                     @PathVariable Long id) {
        return new ResponseEntity<>(logTimeService.updateById(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') && @mySecurityService.isOwnerOfLogTime(#id)")
    public ResponseEntity<LogTime> deleteLogTimeById(@PathVariable Long id) {
        return new ResponseEntity<>(logTimeService.deleteById(id), HttpStatus.OK);
    }

}
