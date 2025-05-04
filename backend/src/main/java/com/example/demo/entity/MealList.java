package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "meal_list")
@Data
public class MealList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private long id;
    
    @Column(name = "recipe_id")
    private String recipeId;

    @Column(name = "recipe_name")
    private String name;

    @Column(name = "quantity")
    private int quantity;

    public MealList() {
    }
    
    public MealList(long id, String recipeId, String name, int quantity) {
        this.id = id;
        this.recipeId = recipeId;
        this.name = name;
        this.quantity = quantity;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRecipeId() {
        return this.recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
