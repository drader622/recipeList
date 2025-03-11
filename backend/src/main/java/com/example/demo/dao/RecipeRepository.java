package com.example.demo.dao;

import com.example.demo.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    Page<Recipe> findByCategoryId(@Param("id") Long id, Pageable pageable);

    Page<Recipe> findByTitleContaining(@Param("title") String title, Pageable pageable);
}
