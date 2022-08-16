package com.max.backend.service.aop;

import com.max.backend.SecurityUtil;
import com.max.backend.entity.Project;
import org.springframework.stereotype.Service;

@Service
public class MySecurityService {

    public boolean userIsMemberOfProject(Project returnObject) {
        String username = SecurityUtil.getCurrentUsername();
        for (int i = 0; i < returnObject.getMembers().size(); i++) {
            if (returnObject.getMembers().get(i).getEmail().equals(username)) {
                return true;
            }
        }
        return false;
    }

}
