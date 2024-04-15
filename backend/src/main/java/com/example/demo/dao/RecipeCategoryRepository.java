package com.example.demo.dao;

import com.example.demo.entity.RecipeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "recipeCategory", path = "recipe-category")
public interface RecipeCategoryRepository extends JpaRepository<RecipeCategory, Long> {
}
