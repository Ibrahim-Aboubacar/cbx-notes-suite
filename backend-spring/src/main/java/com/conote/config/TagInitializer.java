package com.conote.config;

import com.conote.entity.Tag;
import com.conote.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class TagInitializer implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(TagInitializer.class);
    private final TagRepository tagRepository;

    public TagInitializer(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        if(tagRepository.count() == 0){
            for (String tagName : getTags()){
                Tag tag = new Tag(tagName);
                tagRepository.save(tag);
            }
                log.info("Tags populated successfully...");
        } else {
                log.info("All set! No Need to populate the tags...");
        }
    }

    private List<String> getTags(){
        return List.of(
                "Note",
                "Études",
                "Travail",
                "Agenda",
                "Rappel",
                "Objectif",
                "Lecture",
                "Idée",
                "Mémoire",
                "Cours",
                "Projet",
                "Collaboration",
                "Tâches",
                "Journal",
                "Inspiration",
                "Organisation",
                "To-do",
                "Recherche",
                "Écriture",
                "Statistiques",
                "Bookmark",
                "Privé",
                "Important",
                "À revoir"
        );
    }
}
