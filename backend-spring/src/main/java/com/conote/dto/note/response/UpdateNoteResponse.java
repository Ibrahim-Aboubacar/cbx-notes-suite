package com.conote.dto.note.response;

import java.util.UUID;

public class UpdateNoteResponse {
    private UUID id;

    public UpdateNoteResponse(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
