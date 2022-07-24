package com.max.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisterRequest {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String speciality;
//    private String image;
}
