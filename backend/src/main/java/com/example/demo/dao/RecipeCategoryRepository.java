package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.RecipeCategory;

@RepositoryRestResource(collectionResourceRel = "recipeCategory", path = "recipe-category")
public interface RecipeCategoryRepository extends JpaRepository<RecipeCategory, Long> {
}
