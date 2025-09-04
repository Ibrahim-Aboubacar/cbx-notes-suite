package com.conote.dto.note.response;

import java.util.UUID;

public class CreateNoteResponse {
    private UUID id;

    public CreateNoteResponse(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
