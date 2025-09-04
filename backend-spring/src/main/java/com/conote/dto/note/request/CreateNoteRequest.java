package com.conote.dto.note.request;

import com.conote.entity.Tag;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class CreateNoteRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private Boolean isPublic;

    private LocalDateTime expirationDate;

    @NotBlank
    private List<String> sharedWith;

    @NotBlank
    private List<UUID> tags;

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

    public Boolean getPublic() {
        return isPublic;
    }

    public void setPublic(Boolean aPublic) {
        isPublic = aPublic;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public List<String> getSharedWith() {
        return sharedWith;
    }

    public void setSharedWith(List<String> sharedWith) {
        this.sharedWith = sharedWith;
    }

    public List<UUID> getTags() {
        return tags;
    }

    public void setTags(List<UUID> tags) {
        this.tags = tags;
    }
}
