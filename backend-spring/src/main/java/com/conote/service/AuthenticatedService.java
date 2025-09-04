package com.conote.service;

import com.conote.entity.User;
import com.conote.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedService {
    private final UserRepository userRepository;
    private User user;


    public AuthenticatedService(UserRepository userRepository)
    {
        this.userRepository = userRepository;

    }

    public User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            throw new UsernameNotFoundException("Vous n'êtes pas connecté!");
        }

        return userRepository
                .findByEmail(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Vous n'êtes pas connecté!"));
    }
}
