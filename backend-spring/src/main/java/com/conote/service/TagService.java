package com.conote.service;

import com.conote.dto.entity.TagDto;
import com.conote.dto.note.response.TagResponse;
import com.conote.entity.Tag;
import com.conote.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public TagResponse all() {
        List<Tag> tags = tagRepository.findAll();

        List<TagDto> tagsDtos = tags.stream().map((Tag tag) -> new TagDto(tag.getId(),tag.getName())).toList();

        return new TagResponse(tagsDtos);
    }
}
