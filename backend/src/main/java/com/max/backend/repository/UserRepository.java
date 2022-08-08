package com.max.backend.repository;

import com.max.backend.entity.Project;
import com.max.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findAll(Pageable pageable);

    Page<User> findAllByEmailContaining(Pageable pageable, String email);

    @Query("select user from User user where :project member of user.projects")
    Page<User> findAllByProject(Pageable pageable, @Param("project") Project project);

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

}

