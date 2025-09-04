package com.conote.dto.note.response;

import com.conote.dto.entity.DetailedNoteDto;

public class GetNoteResponse {
    private DetailedNoteDto note;

    public GetNoteResponse(DetailedNoteDto note) {
        this.note = note;
    }

    public DetailedNoteDto getNote() {
        return note;
    }

    public void setNote(DetailedNoteDto note) {
        this.note = note;
    }
}
