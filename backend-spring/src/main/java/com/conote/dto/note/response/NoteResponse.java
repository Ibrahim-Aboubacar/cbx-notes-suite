package com.conote.dto.note.response;

import com.conote.dto.entity.NoteDto;

import java.util.List;

public class NoteResponse {
    private List<NoteDto> notes;

    public NoteResponse(List<NoteDto> notes) {
        this.notes = notes;
    }

    public List<NoteDto> getNotes() {
        return notes;
    }

    public void setNotes(List<NoteDto> notes) {
        this.notes = notes;
    }
}
