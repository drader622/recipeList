package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.Recipe;

@CrossOrigin("http://localhost:4200")
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    //returns all recipes by category
    Page<Recipe> findByCategoryId(@Param("id") Long id, Pageable pageable);

    //returns search results based off keyword
    Page<Recipe> findByTitleContaining(@Param("title") String title, Pageable pageable);
}
