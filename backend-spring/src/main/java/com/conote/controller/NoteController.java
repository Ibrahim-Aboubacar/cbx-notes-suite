package com.conote.controller;

import com.conote.dto.note.request.CreateNoteRequest;
import com.conote.dto.note.response.CreateNoteResponse;
import com.conote.dto.note.response.GetNoteResponse;
import com.conote.dto.note.response.NoteResponse;
import com.conote.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }


    @GetMapping
    public ResponseEntity<NoteResponse> getMyNotes(){
        return ResponseEntity.ok(noteService.getMyNotes());
    }

    @PostMapping
    public ResponseEntity<CreateNoteResponse> createNote(@RequestBody CreateNoteRequest request){
        return ResponseEntity.ok(noteService.createNote(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetNoteResponse> getNote(@PathVariable UUID id){
        return ResponseEntity.ok(noteService.getNote(id, false));
    }
}
