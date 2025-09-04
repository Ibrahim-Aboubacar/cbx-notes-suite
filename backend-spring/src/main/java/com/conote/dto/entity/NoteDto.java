package com.conote.dto.entity;

import com.conote.entity.Note;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class NoteDto {
    private UUID id;
    private String title;
    private String content;
    private List<TagDto> tags;
    private int sharedWithCount = 0;

    private UserDto user;
    private Boolean isPublic;
    private LocalDateTime expirationDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public NoteDto(Note note) {

        this.id = note.getId();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.isPublic = note.getIsPublic();

        // get the tags to map to their DTO
        this.tags = note.getTags().stream().map((noteTag) -> new TagDto(noteTag.getId(), noteTag.getName())).toList();

        this.user = new UserDto(note.getUser());
        this.sharedWithCount = note.getSharedWith().size();
        this.expirationDate = note.getExpirationDate();
        this.createdAt = note.getCreatedAt();
        this.updatedAt = note.getUpdatedAt();
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
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
        int maxLength = 120;
        if (content.length() > maxLength) {

            return content.substring(0, maxLength-3)+"...";
        }
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

    public int getSharedWithCount() {
        return sharedWithCount;
    }

    public void setSharedWithCount(int sharedWithCount) {
        this.sharedWithCount = sharedWithCount;
    }
}
