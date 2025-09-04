package com.conote.dto.entity;

import com.conote.entity.Tag;

import java.util.UUID;

public class TagDto {
    private UUID id;
    private String name;

    public TagDto(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public TagDto(Tag tag) {
        this.id = tag.getId();
        this.name = tag.getName();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
