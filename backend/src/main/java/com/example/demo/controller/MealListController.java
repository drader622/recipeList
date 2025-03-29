package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.MealListRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/meal-list")
public class MealListController {

    @Autowired
    private MealListRepository mealListRepository;

    //clears all data in meal list repository
    @DeleteMapping("/clear")
    public ResponseEntity<Void> deleteAll() {
        mealListRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
