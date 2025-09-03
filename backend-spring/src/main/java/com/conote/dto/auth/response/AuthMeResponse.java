package com.conote.dto.auth.response;

import com.conote.dto.entity.UserDto;

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
