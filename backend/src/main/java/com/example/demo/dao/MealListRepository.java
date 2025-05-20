package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.MealList;

@RepositoryRestResource(collectionResourceRel = "mealList", path = "meal-list")
public interface MealListRepository extends JpaRepository<MealList, Long> {

    //deletes data from meal list repository
    @Override
    void deleteAll();
}
