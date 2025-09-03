package com.conote.dto.auth;

import com.conote.dto.UserDto;

public class AuthMeResponse {
    private UserDto user;

    public AuthMeResponse(UserDto user) {
        this.user = user;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
