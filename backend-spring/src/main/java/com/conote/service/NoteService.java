package com.conote.service;

import com.conote.dto.entity.DetailedNoteDto;
import com.conote.dto.entity.NoteDto;
import com.conote.dto.note.request.CreateNoteRequest;
import com.conote.dto.note.request.UpdateNoteRequest;
import com.conote.dto.note.response.*;
import com.conote.entity.Note;
import com.conote.entity.Tag;
import com.conote.entity.User;
import com.conote.repository.NoteRepository;
import com.conote.repository.TagRepository;
import com.conote.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class NoteService {
    private final AuthenticatedService authenticatedService;
    private final NoteRepository noteRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    public NoteService(AuthenticatedService authenticatedService, NoteRepository noteRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.authenticatedService = authenticatedService;
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public NoteResponse getMyNotes() {
        User authenticatedUser = authenticatedService.getUser();

        List<Note> notes = noteRepository.findByUser(authenticatedUser);

        return new NoteResponse(notes.stream().map(NoteDto::new).toList());
    }

    public CreateNoteResponse createNote(CreateNoteRequest request) {
        User authenticatedUser = authenticatedService.getUser();

        Note note = new Note();
        note.setUser(authenticatedUser);
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setIsPublic(request.getIsPublic());

        if (request.getIsPublic()) {
            note.setExpirationDate(request.getExpirationDate());
        } else {
            note.setExpirationDate(LocalDateTime.now());
        }

        if ((long) request.getTags().size() > 0) {
            for (UUID tagId : request.getTags()) {
                Optional<Tag> tag = tagRepository.findById(tagId);
                // Add the tag if found
                tag.ifPresent(note::addTag);
            }
        }

        if ((long) request.getSharedWith().size() > 0) {
            for (String userEmail : request.getSharedWith()) {

                Optional<User> user = userRepository.findByEmail(userEmail);
                // Add the tag if found
                user.ifPresent(note::addSharedWith);
            }
        }

        noteRepository.save(note);

        return new CreateNoteResponse(note.getId());
    }

    public UpdateNoteResponse updateNote(UUID noteId, UpdateNoteRequest request) {
        User authenticatedUser = authenticatedService.getUser();

        Optional<Note> dbNote = noteRepository.findById(noteId);

        if (dbNote.isEmpty()) {
            throw new NoSuchElementException("Note non trouvé!");
        }

        // ensure user owns that note first
        if (dbNote.get().getUser().getId() != authenticatedUser.getId()) {
            throw new NoSuchElementException("Note non trouvé!");
        }

        Note note = dbNote.get();

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setIsPublic(request.getIsPublic());

        if (request.getIsPublic()) {
            note.setExpirationDate(request.getExpirationDate());
        } else {
            note.setExpirationDate(LocalDateTime.now());
        }

        // reinitialise the tags in case user changes the tags
        note.setTags(new HashSet<>());

        if ((long) request.getTags().size() > 0) {

            for (UUID tagId : request.getTags()) {
                Optional<Tag> tag = tagRepository.findById(tagId);
                // Add the tag if found
                tag.ifPresent(note::addTag);
            }
        }

        // reinitialise the shared users in case user changes the shared users
        note.setSharedWith(new HashSet<>());
        if ((long) request.getSharedWith().size() > 0) {
            for (String userEmail : request.getSharedWith()) {

                Optional<User> user = userRepository.findByEmail(userEmail);
                // Add the tag if found
                user.ifPresent(note::addSharedWith);
            }
        }

        noteRepository.save(note);

        return new UpdateNoteResponse(noteId);
    }

    public GetNoteResponse getNote(UUID noteId) {
        User authenticatedUser = authenticatedService.getUser();

        Optional<Note> note = noteRepository.findById(noteId);

        if (note.isEmpty()) {
            throw new NoSuchElementException("Note non trouvé!");
        }

//        ensure note is mine or shared with me
        if (authenticatedUser.getId() == note.get().getUser().getId() || note.get().getSharedWith().contains(authenticatedUser)) {
            return new GetNoteResponse(new DetailedNoteDto(note.get(), authenticatedUser.getId() == note.get().getUser().getId()));
        }


//        ensure note is public
        if(!note.get().getIsPublic()){
            throw new NoSuchElementException("Note non trouvé!");
        }

//        ensure not is not expired
        if(note.get().getExpirationDate().isBefore(LocalDateTime.now())){
            throw new NoSuchElementException("Note non trouvé!");
        }

        return new GetNoteResponse(new DetailedNoteDto(note.get(), false));
    }

    public DeleteNoteResponse deleteNote(UUID noteId) {
        User authenticatedUser = authenticatedService.getUser();

        Optional<Note> note = noteRepository.findById(noteId);

        // Verify that user owns that note if it is present
        if (note.isPresent() && note.get().getUser().getId() == authenticatedUser.getId()) {
            noteRepository.delete(note.get());
            return new DeleteNoteResponse(noteId);
        }
        throw new NoSuchElementException("Note non trouvé!");
    }

    public NoteResponse getPublicNotes() {

        List<Note> notes = noteRepository.findByIsPublicTrueAndExpirationDateAfterAndUserIdNot(LocalDateTime.now(), authenticatedService.getUser().getId());

        return new NoteResponse(notes.stream().map(NoteDto::new).toList());
    }

    public NoteResponse getSharedWithMeNotes() {
        List<Note> notes = noteRepository.findBySharedWith_Id(authenticatedService.getUser().getId());

        return new NoteResponse(notes.stream().map(NoteDto::new).toList());
    }
}
