package com.max.backend.service;

import com.max.backend.controller.dto.request.create.CreateLogTimeRequest;
import com.max.backend.controller.dto.request.update.UpdateLogTimeRequest;
import com.max.backend.entity.LogTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LogTimeService {

    LogTime findById(Long id);

    Page<LogTime> findAllByTicketId(Long ticketId, Pageable pageable);

    Page<LogTime> findAllByProjectId(Long projectId, Pageable pageable);

    Page<LogTime> findAllByUserId(Long userId, Pageable pageable);

    LogTime create(CreateLogTimeRequest createLogTimeRequest);

    LogTime updateById(UpdateLogTimeRequest updateLogTimeRequest, Long id);

    LogTime deleteById(Long id);
}
