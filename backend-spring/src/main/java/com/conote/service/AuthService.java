package com.conote.service;

import com.conote.dto.auth.response.AuthMeResponse;
import com.conote.dto.auth.response.AuthResponse;
import com.conote.dto.auth.request.LoginRequest;
import com.conote.dto.auth.request.RegisterRequest;
import com.conote.dto.entity.UserDto;
import com.conote.entity.User;
import com.conote.repository.UserRepository;
import com.conote.security.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final CustomUserService userService;

    public AuthService(UserRepository userRepo, PasswordEncoder encoder, AuthenticationManager authManager, JwtService jwtService, CustomUserService userDetailsService) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userService = userDetailsService;
    }

    public AuthMeResponse me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            throw new UsernameNotFoundException("Vous n'êtes pas connecté!");
        }

        User user = userRepo
                .findByEmail(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Vous n'êtes pas connecté!"));

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPseudo(user.getPseudo());


        return new AuthMeResponse(userDto);
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        User user = new User();

        user.setPseudo(request.getPseudo());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));

        userRepo.save(user);

        var userDetails = userService.loadUserByUsername(user.getEmail());

        String token = jwtService.generateToken(userDetails);

        Optional<User> dbUser = userRepo.findByEmail(user.getEmail());

        if (dbUser.isPresent()) {

            UserDto resUser = new UserDto();

            resUser.setId(dbUser.get().getId());
            resUser.setEmail(dbUser.get().getEmail());
            resUser.setPseudo(dbUser.get().getPseudo());


            return new AuthResponse(token, resUser);
        } else {
            throw new UsernameNotFoundException("Utilisateur non trouvé!");
        }
    }

    public AuthResponse login(LoginRequest request) {

        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var userDetails = userService.loadUserByUsername(request.getEmail());

        String token = jwtService.generateToken(userDetails);

        Optional<User> dbUser = userRepo.findByEmail(request.getEmail());

        if (dbUser.isPresent()) {

            UserDto resUser = new UserDto();

            resUser.setId(dbUser.get().getId());
            resUser.setEmail(dbUser.get().getEmail());
            resUser.setPseudo(dbUser.get().getPseudo());


            return new AuthResponse(token, resUser);
        } else {
            throw new UsernameNotFoundException("Utilisateur non trouvé!");
        }
    }
}