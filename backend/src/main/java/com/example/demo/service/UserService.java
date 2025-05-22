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

    User loggedInUser;

    Boolean isAuthenticated = false;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User save(User user) {
        String encodedPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return this.userRepository.save(user);
    }

    public LoginResponse checkAuth(String username, String passAttempt) {
        this.isAuthenticated = false;
        User user = this.userRepository.findByUsername(username);
        LoginResponse loginResponse = new LoginResponse();

        String decodedPass = user.getPassword();

        boolean isMatch = passwordEncoder.matches(passAttempt, decodedPass);
        loginResponse.setResponse(isMatch);

        if (loginResponse.getResponse()) {
            this.loggedInUser = user;
            this.isAuthenticated = true;
        }

        return loginResponse;
    }

    public Boolean checkForUser(String username) {
        User user = this.userRepository.findByUsername(username);

        if (user != null) {
            return true;
        }
        return false;
    }

    public Long getUserId() {
        return this.loggedInUser.getId();
    }

    public User getUserInfo() {
        return loggedInUser;
    }

    public Boolean getAuthStatus() {
        return this.isAuthenticated;
    }

    public void logout() {
        this.loggedInUser = new User();
        this.isAuthenticated = false;
    }
}
