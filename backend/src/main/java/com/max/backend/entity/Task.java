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

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
@ToString
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 12)
    private String name;

    @NotBlank
    @Size(min = 2, max = 1024)
    private String description;

    @NotNull
    @CreatedDate
    private Date createdDate;

    //    @NotNull
//    @CreatedDate
    private Date expiryDate;

    @ManyToOne
    @JoinColumn(name = "priority_id", referencedColumnName = "id")
    @NotNull
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @NotNull
    @JsonIgnore
    private Project project;

    @ManyToOne
    @JoinColumn(name = "project_status_id", referencedColumnName = "id")
    @NotNull
    private ProjectStatus projectStatus;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tasks_m2m_users",
            joinColumns = {@JoinColumn(name = "task_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    @ToString.Exclude
    @Builder.Default
    private List<User> executors = new ArrayList<>();

}
