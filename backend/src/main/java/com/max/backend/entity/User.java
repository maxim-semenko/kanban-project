package com.max.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
@ToString
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank
    @Size(min = 7, max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 256)
    @JsonIgnore
    private String password;

    @NotBlank
    @Size(min = 2, max = 30)
    private String firstname;

    @NotBlank
    @Size(min = 2, max = 30)
    private String lastname;

    @NotBlank
    @Size(min = 2, max = 30)
    private String speciality;

    @NotNull
    @CreatedDate
    private Date createdDate;

    @NotNull
    @Builder.Default
    private Boolean isAccountNonLocked = true;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_m2m_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    @JsonIgnore
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(mappedBy = "members")
    @JsonIgnore
    @Builder.Default
    @ToString.Exclude
    private List<Project> projects = new ArrayList<>();

}
