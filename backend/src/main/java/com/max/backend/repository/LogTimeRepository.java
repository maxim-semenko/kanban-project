package com.max.backend.repository;

import com.max.backend.entity.LogTime;
import com.max.backend.entity.Project;
import com.max.backend.entity.Ticket;
import com.max.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LogTimeRepository extends JpaRepository<LogTime, Long> {

    Page<LogTime> findAllByUser(User user, Pageable pageable);

    Page<LogTime> findAllByTicket(Ticket ticket, Pageable pageable);

    @Query("select logTime from LogTime logTime where logTime.ticket.project =:project")
    Page<LogTime> findAllByProject(@Param("project") Project Project, Pageable pageable);


}
