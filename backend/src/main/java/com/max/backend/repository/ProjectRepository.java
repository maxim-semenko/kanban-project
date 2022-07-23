package com.max.backend.repository;

import com.max.backend.entity.Project;
import com.max.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select project from Project project where :user member of project.members")
    Page<Project> findAllByUser(Pageable pageable, @Param("user") User user);
}
