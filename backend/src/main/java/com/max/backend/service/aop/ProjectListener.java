package com.max.backend.service.aop;

import com.max.backend.util.SecurityUtil;
import com.max.backend.entity.Project;
import com.max.backend.exception.ResourseForbiddenException;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

@Slf4j
public class ProjectListener {

    @PreUpdate
    @PreRemove
    private void beforeAnyUpdateRemove(Project project) {
        if (!SecurityUtil.getCurrentUsername().equals(project.getCreator().getEmail())) {
            log.error("User has access only to his project!");
            throw new ResourseForbiddenException("User has access only to his project!");
        }
    }
}
