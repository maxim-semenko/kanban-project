package com.max.backend.service.aop;

import com.max.backend.entity.Ticket;
import com.max.backend.exception.ResourseForbiddenException;
import com.max.backend.util.SecurityUtil;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;

@Slf4j
public class TicketListener {

    @PrePersist
    @PreRemove
    private void beforeAnyCreateRemove(Ticket ticket) {
        if (!SecurityUtil.getCurrentUsername().equals(ticket.getProject().getCreator().getEmail())) {
            log.error("User has access only to his project!");
            throw new ResourseForbiddenException("User has access only to his project!");
        }
    }
}
