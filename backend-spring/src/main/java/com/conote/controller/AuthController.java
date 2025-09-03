package com.conote.controller;

import com.conote.dto.auth.AuthMeResponse;
import com.conote.dto.auth.AuthResponse;
import com.conote.dto.LoginRequest;
import com.conote.dto.RegisterRequest;
import com.conote.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @GetMapping("/me")
    public ResponseEntity<AuthMeResponse> me(){
        return ResponseEntity.ok(authService.me());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login( @RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register( @RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }
}
