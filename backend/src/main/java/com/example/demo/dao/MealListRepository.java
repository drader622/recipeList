package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.MealList;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel="mealList", path="meal-list")
public interface MealListRepository extends JpaRepository<MealList, Long> {

    //deletes data from meal list repository
    @Override
    void deleteAll();
}
