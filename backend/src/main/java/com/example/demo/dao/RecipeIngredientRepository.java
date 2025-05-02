package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.RecipeIngredient;

@CrossOrigin("http://localhost:4200")
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    Page<RecipeIngredient> findByRecipeId(@Param("id") Long id, Pageable pageable);
}
