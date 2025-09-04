package com.conote.service;

import com.conote.dto.entity.DetailedNoteDto;
import com.conote.dto.entity.NoteDto;
import com.conote.dto.note.request.CreateNoteRequest;
import com.conote.dto.note.response.CreateNoteResponse;
import com.conote.dto.note.response.DeleteNoteResponse;
import com.conote.dto.note.response.GetNoteResponse;
import com.conote.dto.note.response.NoteResponse;
import com.conote.entity.Note;
import com.conote.entity.Tag;
import com.conote.entity.User;
import com.conote.repository.NoteRepository;
import com.conote.repository.TagRepository;
import com.conote.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

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

    public CreateNoteResponse createNote(CreateNoteRequest request){
        User authenticatedUser = authenticatedService.getUser();

        Note note = new Note();
        note.setUser(authenticatedUser);
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setPublic(request.getPublic());
        note.setExpirationDate(request.getExpirationDate());

        if((long) request.getTags().size() > 0){
            for (UUID tagId : request.getTags()){
                Optional<Tag> tag = tagRepository.findById(tagId);
            // Add the tag if found
                tag.ifPresent(note::addTag);
            }
        }

        if((long) request.getSharedWith().size() > 0){
            for (String userEmail : request.getSharedWith()){

                Optional<User> user = userRepository.findByEmail(userEmail);
                // Add the tag if found
                user.ifPresent(note::addSharedWith);
            }
        }

        noteRepository.save(note);

        return new CreateNoteResponse(note.getId());
    }

    public GetNoteResponse getNote(UUID noteId, Boolean isPublic){
        User authenticatedUser = authenticatedService.getUser();

        Optional<Note> note = noteRepository.findById(noteId);

        if(note.isPresent()){

            if(isPublic && (Boolean) note.get().getPublic()){
                // If note has expired set it to not found
                if(note.get().getExpirationDate().isAfter(LocalDateTime.now())){
                    throw new NoSuchElementException("Note non trouvé!");
                }
                // we don't return thr shared with users if the note is publicly viewed
                return new GetNoteResponse(new DetailedNoteDto(note.get(), false));
            }
            // Verify that user owns that note if not looking for public
            if(note.get().getUser().getId() == authenticatedUser.getId()){
                return new GetNoteResponse(new DetailedNoteDto(note.get(), true));
            }

        }

        throw new NoSuchElementException("Note non trouvé!");
    }

    public DeleteNoteResponse deleteNote(UUID noteId){
        User authenticatedUser = authenticatedService.getUser();

        Optional<Note> note = noteRepository.findById(noteId);

        // Verify that user owns that note if it is present
        if(note.isPresent() && note.get().getUser().getId() == authenticatedUser.getId()){
            noteRepository.delete(note.get());
            return new DeleteNoteResponse(noteId);
        }
        throw new NoSuchElementException("Note non trouvé!");
    }
}
