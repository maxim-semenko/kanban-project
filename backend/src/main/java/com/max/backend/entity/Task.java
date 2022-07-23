package com.max.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 256)
    @NotBlank
    private String name;

    @Size(min = 2, max = 1024)
    @NotBlank
    private String description;

    @NotNull
    @CreatedDate
    private Date createdDate;

    @Size(min = 2, max = 50)
    @NotBlank
    private String priority;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @NotNull
    private Project project;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "tasks_m2m_tags",
            joinColumns = {@JoinColumn(name = "task_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")}
    )
    @JsonIgnore
    private List<Tag> tags = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "tasks_m2m_users",
            joinColumns = {@JoinColumn(name = "task_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    @JsonIgnore
    private List<User> executors = new ArrayList<>();

}
