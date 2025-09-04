package com.conote.dto.entity;

import com.conote.entity.Note;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

public class DetailedNoteDto {
    private UUID id;
    private String title;
    private String content;
    private List<TagDto> tags;
    private List<UserDto> sharedWith = new ArrayList<>();

    private UserDto user;
    private Boolean isPublic;
    private LocalDateTime expirationDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public DetailedNoteDto(Note note, Boolean withSharedUser) {

        this.id = note.getId();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.isPublic = note.getIsPublic();

        // get the tags to map to their DTO
        this.tags = note.getTags().stream()
                .map(TagDto::new)
                .sorted(Comparator.comparing(TagDto::getName))
                .toList();

        // get the users to map to their DTO
        if(withSharedUser){
            this.sharedWith = note.getSharedWith().stream()
                    .map(UserDto::new)
                    .sorted(Comparator.comparing(UserDto::getPseudo))
                    .toList();
        }

        this.user = new UserDto(note.getUser());
        this.expirationDate = note.getExpirationDate();
        this.createdAt = note.getCreatedAt();
        this.updatedAt = note.getUpdatedAt();
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean aPublic) {
        isPublic = aPublic;
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

    public List<TagDto> getTags() {
        return tags;
    }

    public void setTags(List<TagDto> tags) {
        this.tags = tags;
    }

    public List<UserDto> getSharedWith() {
        return sharedWith;
    }

    public void setSharedWith(List<UserDto> sharedWith) {
        this.sharedWith = sharedWith;
    }
}
