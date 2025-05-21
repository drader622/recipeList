package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.MealListRepository;

@RestController
@RequestMapping("/api/meal-list")
public class MealListController {

    @Autowired
    private MealListRepository mealListRepository;

    //clears all data in meal list repository
    @DeleteMapping("/clear")
    public void deleteAll() {
        mealListRepository.deleteAll();
    }
}
