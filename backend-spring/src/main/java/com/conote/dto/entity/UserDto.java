package com.conote.dto.entity;

import com.conote.entity.User;

import java.util.UUID;

public class UserDto {
    private UUID id;
    private String pseudo;
    private String email;

    public UserDto(User user) {
        this.id = user.getId();
        this.pseudo = user.getPseudo();
        this.email = user.getEmail();
    }

    public UserDto() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
