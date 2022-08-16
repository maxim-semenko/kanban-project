package com.max.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.max.backend.controller.dto.request.create.CreateTaskRequest;
import com.max.backend.entity.Priority;
import com.max.backend.entity.Project;
import com.max.backend.entity.Task;
import com.max.backend.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    TaskService taskService;

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void findTaskById() throws Exception {
//        // given
//        Long id = 1L;
//        final String URL = "/api/v1/tasks/" + id;
//        CreateTaskRequest createTaskRequest = new CreateTaskRequest();
//        createTaskRequest.setName("TEST");
//        createTaskRequest.setDescription("DESCRIPTION");
//        createTaskRequest.setExpiryDate(new Date());
////        c
//
//        // when
//        Mockito.when(projectStatusService.findById(id)).thenReturn(projectStatus);
//
//        // then
//        MvcResult mvcResult = mockMvc
//                .perform(get(URL))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String actualJsonResponse = mvcResult.getResponse().getContentAsString();
//        String expectedJsonResponse = objectMapper.writeValueAsString(projectStatus);
//
//        assertEquals(expectedJsonResponse, actualJsonResponse);
    }

    @Test
    void findTasksByProjectId() {
    }

    @Test
    void findAllPriorities() {
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"USER", "ADMIN"})
    void createTask() throws Exception {
        // given
        final String URL = "/api/v1/tasks/";
        CreateTaskRequest request = new CreateTaskRequest();
        request.setName("TEST");
        request.setDescription("DESCRIPTION");
        request.setExpiryDate(new Date());
        request.setProjectId(1L);
        request.setPriorityId(1L);
        request.setProjectStatusId(1L);

        Task savedTask = Task.builder()
                .id(1L)
                .name(request.getName())
                .description(request.getDescription())
                .expiryDate(request.getExpiryDate())
                .project(new Project())
                .createdDate(new Date())
                .priority(new Priority())
                .build();

        // when
        Mockito.when(taskService.create(request)).thenReturn(savedTask);

        // then
        MvcResult mvcResult = mockMvc
                .perform(post(URL)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn();

        assertEquals(201, mvcResult.getResponse().getStatus());
    }

    @Test
    void updateTaskById() {
    }

    @Test
    void deleteTaskById() {
    }

    @Test
    void testUpdateTaskById() {
    }

    @Test
    void addUserToTask() {
    }

    @Test
    void removeUserFromTask() {
    }
}