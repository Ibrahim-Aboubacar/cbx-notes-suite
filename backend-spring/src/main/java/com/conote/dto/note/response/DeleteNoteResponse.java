package com.conote.dto.note.response;

import java.util.UUID;

public class DeleteNoteResponse {
    private UUID id;

    public DeleteNoteResponse(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
