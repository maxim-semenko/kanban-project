package com.max.backend.service.aop;

import com.max.backend.util.SecurityUtil;
import com.max.backend.entity.Task;
import com.max.backend.exception.ResourseForbiddenException;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;

@Slf4j
public class TaskListener {

    @PrePersist
    @PreRemove
    private void beforeAnyCreateRemove(Task task) {
        if (!SecurityUtil.getCurrentUsername().equals(task.getProject().getCreator().getEmail())) {
            log.error("User has access only to his project!");
            throw new ResourseForbiddenException("User has access only to his project!");
        }
    }
}
