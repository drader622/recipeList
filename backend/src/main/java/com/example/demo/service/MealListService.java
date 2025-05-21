package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MealListRepository;

import jakarta.transaction.Transactional;

@Service
public class MealListService {

    @Autowired
    MealListRepository mealListRepository;

    //clears all the data in the meal list repository 
    @Transactional
    public void clearTable() {
        mealListRepository.deleteAll();
    }

}
