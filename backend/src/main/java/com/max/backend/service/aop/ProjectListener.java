package com.max.backend.service.aop;

import com.max.backend.entity.Project;
import com.max.backend.exception.ResourseForbiddenDeleteException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

@Slf4j
public class ProjectListener {

    @PreUpdate
    @PreRemove
    private void beforeAnyUpdate(Project project) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!userDetails.getUsername().equals(project.getCreator().getEmail())) {
            log.error("User has access only to his project!");
            throw new ResourseForbiddenDeleteException("User has access only to his project!");
        }
    }
}
