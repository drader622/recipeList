package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/users")
public class UserController {

    Long userId = (long) -1;

    @Autowired
    UserService userService;

    @PostMapping("/api/users")
    public User createUser(@RequestBody User user) {
        return this.userService.save(user);
    }

    @GetMapping("/loginRequest")
    public Long checkUserAuth(@RequestParam String username, @RequestParam String password) {
        System.out.println("UserController username " + username);
        System.out.println("UserController password " + password);
        LoginResponse isAuthenticated = this.userService.checkAuth(username, password);

        if (isAuthenticated.getResponse()) {
            userId = this.userService.getUserId();
            System.out.println(userId);
        } else {
            userId = (long) -1;
        }

        return userId;
    }

    @GetMapping("/userInfo")
    public Optional<User> getUserInfo(@RequestParam Long id) {
        return this.userService.getUserInfo((long) id);
    }

    @GetMapping("/authState")
    public Boolean getAuthState() {
        return this.userService.getAuthStatus();
    }
    

    @PostMapping("/register")
    public void register(@RequestBody User user) {
        //TODO: process POST request

        System.out.println(user);

        // return this.userService.save(user);
    }

}
