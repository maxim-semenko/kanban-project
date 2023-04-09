package com.max.backend.app;

import com.max.backend.entity.Priority;
import com.max.backend.entity.Role;
import com.max.backend.entity.User;
import com.max.backend.entity.enums.PriorityEnum;
import com.max.backend.entity.enums.RoleEnum;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.PriorityRepository;
import com.max.backend.repository.RoleRepository;
import com.max.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

@Service
@RequiredArgsConstructor
@PropertySource("/application.properties")
@Slf4j
public class AppInitialization {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PriorityRepository priorityRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.init-props.admin.email}")
    private String adminEmail;

    @Value("${app.init-props.admin.password}")
    private String adminPassword;

    @EventListener(ContextRefreshedEvent.class)
    public void postContextInitialization() {
        log.info("Initialization method has started");
        initRoles();
        initPriorities();
        initAdminAccount();
    }

    private void initRoles() {
        log.info("init roles");
        if (roleRepository.findByName(RoleEnum.ROLE_ADMIN).isEmpty()) {
            Role roleAdmin = new Role(1L, RoleEnum.ROLE_ADMIN);
            roleRepository.save(roleAdmin);
        }
        if (roleRepository.findByName(RoleEnum.ROLE_USER).isEmpty()) {
            Role roleUser = new Role(2L, RoleEnum.ROLE_USER);
            roleRepository.save(roleUser);
        }
    }

    private void initPriorities() {
        log.info("init priorities");
        if (priorityRepository.findByName(PriorityEnum.LOW).isEmpty()) {
            Priority priorityLow = new Priority(1L, PriorityEnum.LOW);
            priorityRepository.save(priorityLow);
        }
        if (priorityRepository.findByName(PriorityEnum.MEDIUM).isEmpty()) {
            Priority priorityMedium = new Priority(2L, PriorityEnum.MEDIUM);
            priorityRepository.save(priorityMedium);
        }
        if (priorityRepository.findByName(PriorityEnum.HIGH).isEmpty()) {
            Priority priorityHigh = new Priority(3L, PriorityEnum.HIGH);
            priorityRepository.save(priorityHigh);
        }
    }

    private void initAdminAccount() {
        log.info("init admin account");
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User user = User.builder()
                    .firstname("admin")
                    .lastname("admin")
                    .speciality("Administrator")
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .createdDate(new Date())
                    .isAccountNonLocked(true)
                    .roles(Set.of(roleRepository.findByName(RoleEnum.ROLE_ADMIN)
                                    .orElseThrow(() -> new ResourseNotFoundException("Role not found!")),
                            roleRepository.findByName(RoleEnum.ROLE_USER)
                                    .orElseThrow(() -> new ResourseNotFoundException("Role not found!"))))
                    .build();

            userRepository.save(user);
        }
    }
}
