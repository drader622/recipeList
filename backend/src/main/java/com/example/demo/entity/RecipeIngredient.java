package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "recipe_ingredients")
@Data
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "recipe_id")
    private Long recipeId;

    @Column(name = "ingredient")
    private String name;

    @Column(name = "amount")
    private double amount;

    @Column(name = "unit")
    private String unit;
}
