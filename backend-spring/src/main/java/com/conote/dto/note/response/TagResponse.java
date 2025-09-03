package com.conote.dto.note.response;

import com.conote.dto.entity.TagDto;
import com.conote.entity.Tag;

import java.util.List;
import java.util.UUID;

public class TagResponse {
    private List<TagDto> tags;

    public TagResponse(List<TagDto> tags) {
        this.tags = tags;
    }

    public List<TagDto> getTags() {
        return tags;
    }

    public void setTags(List<TagDto> tags) {
        this.tags = tags;
    }
}
