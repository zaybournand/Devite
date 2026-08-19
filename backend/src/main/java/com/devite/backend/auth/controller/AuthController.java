package com.devite.backend.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO request) {

    }
}
