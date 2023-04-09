package com.max.backend.repository;

import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.entity.Ticket;
import com.max.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Page<Ticket> findAllByProject(Project project, Pageable pageable);

    @Query("select ticket from Ticket ticket where :user in ticket.executors")
    Page<Ticket> findAllByUser(@Param("user") User user, Pageable pageable);

    @Query("select ticket from Ticket ticket where :user in ticket.executors")
    List<Ticket> findListByUser(@Param("user") User user);

    Long countAllByProjectStatus(ProjectStatus projectStatus);
}
