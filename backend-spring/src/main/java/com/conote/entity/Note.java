package com.conote.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

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

    private Boolean isPublic = false;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable=true)
    private LocalDateTime expirationDate;

    @ManyToMany
    private Set<User> sharedWith = new HashSet<User>();

    @ManyToMany
    private Set<Tag> tags = new HashSet<Tag>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (createdAt == null) createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean aPublic) {
        isPublic = (Boolean) aPublic;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getSharedWith() {
        return sharedWith;
    }

    public void setSharedWith(Set<User> sharedWith) {
        this.sharedWith = sharedWith;
    }

    public void addSharedWith(User sharedWith) {
        if(this.sharedWith == null){
            this.sharedWith = new HashSet<User>();
        }
            this.sharedWith.add(sharedWith);
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(HashSet<Tag> tags) {
        this.tags = tags;
    }

    public void addTag(Tag tag) {
        if (this.tags == null) {
            this.tags = new HashSet<Tag>();
        }
        this.tags.add(tag);
    }
}
