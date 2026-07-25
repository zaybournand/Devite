package com.devite.backend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devite.backend.user.dto.UserRequestDTO;
import com.devite.backend.user.dto.UserResponseDTO;
import com.devite.backend.user.model.User;
import com.devite.backend.user.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
        String email = userRequestDTO.getEmail();
        String password = userRequestDTO.getPassword();

        if (password.length() < 5) {
            throw new IllegalArgumentException("The password must be at least 5 characters long.");
        }

        String usernamePrefix = email.split("@")[0];
        if (usernamePrefix.length() < 3) {
            throw new IllegalArgumentException("The email prefix before the @ must be at least 3 characters long.");
        }

        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        User savedUser = userRepository.save(user);
        return new UserResponseDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
    }

    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void deletedUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

}
