package com.conote.controller;

import com.conote.dto.note.request.CreateNoteRequest;
import com.conote.dto.note.request.UpdateNoteRequest;
import com.conote.dto.note.response.*;
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

    @GetMapping("/public")
    public ResponseEntity<NoteResponse> getPublicNotes(){
        return ResponseEntity.ok(noteService.getPublicNotes());
    }

    @GetMapping("/shared-with-me")
    public ResponseEntity<NoteResponse> getSharedWithMeNotes(){
        return ResponseEntity.ok(noteService.getSharedWithMeNotes());
    }

    @PostMapping
    public ResponseEntity<CreateNoteResponse> createNote(@RequestBody CreateNoteRequest request){
        return ResponseEntity.ok(noteService.createNote(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateNoteResponse> updateNote(@PathVariable UUID id, @RequestBody UpdateNoteRequest request){
        return ResponseEntity.ok(noteService.updateNote(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetNoteResponse> getNote(@PathVariable UUID id){
        return ResponseEntity.ok(noteService.getNote(id, true));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteNoteResponse> deleteNote(@PathVariable UUID id){
        return ResponseEntity.ok(noteService.deleteNote(id));
    }


}
