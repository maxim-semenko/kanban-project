package com.max.backend.service.aop;

import com.max.backend.entity.LogTime;
import com.max.backend.exception.ResourseNotFoundException;
import com.max.backend.repository.LogTimeRepository;
import com.max.backend.repository.ProjectRepository;
import com.max.backend.util.SecurityUtil;
import com.max.backend.entity.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MySecurityService {

    private final LogTimeRepository logTimeRepository;

    public boolean userIsMemberOfProject(Project returnObject) {
        String username = SecurityUtil.getCurrentUsername();
        for (int i = 0; i < returnObject.getMembers().size(); i++) {
            if (returnObject.getMembers().get(i).getEmail().equals(username)) {
                return true;
            }
        }
        return false;
    }

    public boolean isOwnerOfLogTime(Long logTimeId) {
        String email = SecurityUtil.getCurrentUsername();
        LogTime logTime = logTimeRepository.findById(logTimeId)
                .orElseThrow(() -> new ResourseNotFoundException("LogTime not found!"));

        return logTime.getUser().getEmail().equals(email);
    }

}
