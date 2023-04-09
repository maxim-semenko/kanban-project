package com.max.backend.repository;

import com.max.backend.entity.Priority;
import com.max.backend.entity.Role;
import com.max.backend.entity.enums.PriorityEnum;
import com.max.backend.entity.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {

    Optional<Priority> findByName(PriorityEnum name);

}
