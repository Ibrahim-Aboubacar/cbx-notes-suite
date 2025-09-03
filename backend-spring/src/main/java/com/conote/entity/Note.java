package com.conote.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    private UUID id;
    private String title;

    @ManyToOne
    private User user;
    private Boolean isPublic;
    private String content;

    @Column(nullable=true)
    private LocalDateTime expirationDate;

    @ManyToMany
    private List<User> sharedWith;

    @ManyToMany
    private List<Tag> tags;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
