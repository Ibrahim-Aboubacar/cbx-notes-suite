package com.conote.controller;

import com.conote.dto.auth.response.AuthMeResponse;
import com.conote.dto.note.response.TagResponse;
import com.conote.entity.Tag;
import com.conote.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/tags")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("")
    public ResponseEntity<TagResponse> all(){
        return ResponseEntity.ok(tagService.all());
    }
}
