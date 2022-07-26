package com.max.backend.repository;

import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectStatusRepository extends JpaRepository<ProjectStatus, Long> {

    Page<ProjectStatus> findAllByProject(Pageable pageable, Project project);
}
