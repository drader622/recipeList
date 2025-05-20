package com.example.demo.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.LoginResponse;
import com.example.demo.entity.User;

@Service
public class UserService {
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User save(User user) {
        String encodedPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return this.userRepository.save(user);
    }

    public LoginResponse getInfo(String username) {
        User user = this.userRepository.findByUsername(username);
        LoginResponse loginResponse = new LoginResponse();

        String tempPassword = "P4ssword";
        String password = user.getPassword();

        boolean isMatch = passwordEncoder.matches(tempPassword, password);
        loginResponse.setResponse(isMatch);

        return loginResponse;
    }
}
