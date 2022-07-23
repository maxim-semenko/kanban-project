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

    @Query("select user from User user where :project member of user.projects")
    Page<User> findAllByProject(Pageable pageable, @Param("project") Project project);

    Optional<User> findByUsername(String username);

    /**
     * Method that finds all users by username.
     *
     * @param pageable contain any params (size, page, etc)
     * @param username params for search
     * @return page of users
     */
    Page<User> findAllByUsernameContaining(Pageable pageable, String username);

    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}

