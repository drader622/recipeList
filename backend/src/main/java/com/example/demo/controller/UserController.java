package com.example.demo.controller;

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
        LoginResponse isAuthenticated = this.userService.checkAuth(username, password);

        if (isAuthenticated.getResponse()) {
            userId = this.userService.getUserId();
        } else {
            userId = (long) -1;
        }

        return userId;
    }

    @GetMapping("/userInfo")
    public User getUserInfo() {
        return this.userService.getUserInfo();
    }

    @GetMapping("/authState")
    public Boolean getAuthState() {
        return this.userService.getAuthStatus();
    }
    
    @PostMapping("/logout")
    public void logout() {
        this.userService.logout();
        
    }
    

    @PostMapping("/register")
    public void register(@RequestBody User user) {
        //TODO: process POST request

        System.out.println(user);

        // return this.userService.save(user);
    }

}
