package com.example.demo.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestReporter;

class IngredientTotalTest {
    ArrayList<RecipeIngredient> ingredients = new ArrayList<>();
    ArrayList<RecipeIngredient> baseIngredientList = new ArrayList<>();
    RecipeIngredient newIngredient = new RecipeIngredient();

    @BeforeEach
    void setUp() {
        newIngredient = new RecipeIngredient(1, 1, "Boneless Skinless Chicken Breasts", 24.0, "oz");
        baseIngredientList.add(newIngredient);
        newIngredient = new RecipeIngredient(2, 1, "Zucchini", 2.0, "whole");
        baseIngredientList.add(newIngredient);
        newIngredient = new RecipeIngredient(3, 1, "Panko Breadcrumbs", 1.0, "cup");
        baseIngredientList.add(newIngredient);
        newIngredient = new RecipeIngredient(4, 1, "Buttermilk-Dill Seasoning", 3.5, "tsp");
        baseIngredientList.add(newIngredient);

        newIngredient = new RecipeIngredient(1, 1, "Boneless Skinless Chicken Breasts", 12.0, "oz");
        ingredients.add(newIngredient);
        newIngredient = new RecipeIngredient(2, 1, "Zucchini", 1.0, "whole");
        ingredients.add(newIngredient);
        newIngredient = new RecipeIngredient(3, 1, "Panko Breadcrumbs", 0.5, "cup");
        ingredients.add(newIngredient);
    }

    @Test
    public void testAddIngredients(TestReporter testReporter) {
        newIngredient = new RecipeIngredient(1, 1, "Boneless Skinless Chicken Breasts", 12.0, "oz");
        checkList(newIngredient);
        newIngredient = new RecipeIngredient(2, 1, "Zucchini", 1.0, "whole");
        checkList(newIngredient);
        newIngredient = new RecipeIngredient(3, 1, "Panko Breadcrumbs", 0.5, "cup");
        checkList(newIngredient);
        newIngredient = new RecipeIngredient(4, 1, "Buttermilk-Dill Seasoning", 3.5, "tsp");
        checkList(newIngredient);

        assertEquals(ingredients, baseIngredientList);
        testReporter.publishEntry("testAddIngredients() proved that ArrayList<RecipeIngredient> ingredients equals ArrayList<RecipeIngredient> baseIngredientList");
    }

    private void checkList(RecipeIngredient newIngredient) {
        RecipeIngredient mealListItem = new RecipeIngredient();
        int index;

        index = ingredients.indexOf(newIngredient);
        if (index != -1) {
            mealListItem = ingredients.get(index);
            mealListItem.setAmount(mealListItem.getAmount() + newIngredient.getAmount());
        } else {
            ingredients.add(newIngredient);
        }
    }

}
