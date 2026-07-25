package com.devite.backend.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devite.backend.user.dto.UserRequestDTO;
import com.devite.backend.user.dto.UserResponseDTO;
import com.devite.backend.user.model.User;
import com.devite.backend.user.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/v1/auth/")
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO request) {
        UserResponseDTO response = userService.createUser(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v1/auth/{id}")
    public Iterable<User> getUser() {
        return userService.findAllUsers();
    }

    @DeleteMapping("/api/v1/auth/{id}")
    public ResponseEntity<String> deletedUser(@PathVariable Long id) {
        userService.deletedUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

}
