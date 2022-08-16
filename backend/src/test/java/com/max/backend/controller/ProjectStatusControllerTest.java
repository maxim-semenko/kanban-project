package com.max.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.max.backend.controller.dto.request.create.CreateProjectStatusRequest;
import com.max.backend.controller.dto.request.update.UpdateProjectStatusRequest;
import com.max.backend.entity.Project;
import com.max.backend.entity.ProjectStatus;
import com.max.backend.service.impl.ProjectStatusServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class ProjectStatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    ProjectStatusServiceImpl projectStatusService;

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void findProjectStatusById() throws Exception {
        // given
        Long id = 1L;
        final String URL = "/api/v1/project-statuses/" + id;
        ProjectStatus projectStatus = ProjectStatus.builder()
                .id(id)
                .name("TEST")
                .build();

        // when
        Mockito.when(projectStatusService.findById(id)).thenReturn(projectStatus);

        // then
        MvcResult mvcResult = mockMvc
                .perform(get(URL))
                .andExpect(status().isOk())
                .andReturn();

        String actualJsonResponse = mvcResult.getResponse().getContentAsString();
        String expectedJsonResponse = objectMapper.writeValueAsString(projectStatus);

        assertEquals(expectedJsonResponse, actualJsonResponse);
    }

    @Test
    void findAllProjectStatusesByProjectId() {
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void createProjectStatus() throws Exception {
        // given
        final String URL = "/api/v1/project-statuses/";
        CreateProjectStatusRequest newProjectStatus = new CreateProjectStatusRequest();
        newProjectStatus.setProjectId(1L);
        newProjectStatus.setName("TEST");
        newProjectStatus.setLimitTotalTask(10L);

        ProjectStatus savedProjectStatus = ProjectStatus.builder()
                .id(1L)
                .name("TEST")
                .project(new Project())
                .limitTotalTask(10L)
                .tasks(List.of())
                .build();

        // when
        Mockito.when(projectStatusService.create(newProjectStatus)).thenReturn(savedProjectStatus);

        // then
        MvcResult mvcResult = mockMvc
                .perform(post(URL)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(newProjectStatus)))
                .andExpect(status().isCreated())
                .andReturn();

        assertEquals(201, mvcResult.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void updateProjectStatusById() throws Exception {
        // given
        final Long id = 1L;
        final String URL = "/api/v1/project-statuses/" + id;
        UpdateProjectStatusRequest updateProjectStatusRequest = new UpdateProjectStatusRequest();
        updateProjectStatusRequest.setName("TEST");
        updateProjectStatusRequest.setLimitTotalTask(10L);

        ProjectStatus updatedProjectStatus = new ProjectStatus();
        updatedProjectStatus.setId(id);
        updatedProjectStatus.setName(updateProjectStatusRequest.getName());
        updatedProjectStatus.setLimitTotalTask(updateProjectStatusRequest.getLimitTotalTask());

        // when
        Mockito.when(projectStatusService.updateById(updateProjectStatusRequest, id)).thenReturn(updatedProjectStatus);

        // then
        MvcResult mvcResult = mockMvc
                .perform(put(URL)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(updateProjectStatusRequest)))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @Test
    void deleteProjectStatusById() {
    }
}



