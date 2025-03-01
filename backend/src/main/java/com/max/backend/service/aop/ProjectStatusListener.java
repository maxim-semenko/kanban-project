package com.max.backend.service.aop;

import com.max.backend.util.SecurityUtil;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.exception.ResourseForbiddenException;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

@Slf4j
public class ProjectStatusListener {

    @PrePersist
    @PreUpdate
    @PreRemove
    private void beforeAnyCreateUpdateRemove(ProjectStatus projectStatus) {
        if (!SecurityUtil.getCurrentUsername().equals(projectStatus.getProject().getCreator().getEmail())) {
            log.error("User has access only to his project!");
            throw new ResourseForbiddenException("User has access only to his project!");
        }
    }
}
