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

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 25)
    private String title;

    @NotBlank
    @Size(min = 2, max = 1024)
    private String description;

    @NotNull
    @CreatedDate
    private Date createdDate;

    @NotNull
    private Date expiryDate;

    @ManyToOne
    @JoinColumn(name = "priority_id", referencedColumnName = "id")
    @NotNull
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @NotNull
//    @JsonIgnore
    private Project project;

    @ManyToOne
    @JoinColumn(name = "project_status_id", referencedColumnName = "id")
    @NotNull
    private ProjectStatus projectStatus;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    @NotNull
    private User creator;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "tickets_m2m_users",
            joinColumns = {@JoinColumn(name = "task_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    @ToString.Exclude
    @Builder.Default
    private Set<User> executors = new HashSet<>();

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.REMOVE)
    @JsonIgnore
    @ToString.Exclude
    @Builder.Default
    private List<LogTime> logTimes = new ArrayList<>();

}
