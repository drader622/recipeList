package com.example.demo.entity;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestReporter;

class MealTest {

    ArrayList<MealList> mealList = new ArrayList<>();

    @BeforeEach
    void setUp() {
        MealList mealListItem = new MealList(0, "1", "meal list item", 1);
        mealList.add(mealListItem);
    }

    @Test
    public void testAddMeal(TestReporter testReporter) {
        MealList testMealListItem = new MealList(1, "2", "test meal list item", 1);
        mealList.add(testMealListItem);
        assertEquals(mealList.get(1), testMealListItem);
        testReporter.publishEntry("testAddMeal() added '" + mealList.get(1).getName() + "' (which equals '" + testMealListItem.getName() + "')");
    }

    @Test
    public void testAddQuantity(TestReporter testReporter) {
        int quantity = mealList.get(0).getQuantity();
        mealList.get(0).setQuantity(quantity + 1);
        assertEquals(mealList.get(0).getQuantity(), quantity + 1);
        testReporter.publishEntry("testAddQuantity() made the new quantity " + mealList.get(0).getQuantity() + " (which is " + quantity + " + 1).");
    }

    @Test
    public void testSubtractQuantity(TestReporter testReporter) {
        int quantity = mealList.get(0).getQuantity();
        mealList.get(0).setQuantity(quantity - 1);
        assertEquals(mealList.get(0).getQuantity(), quantity - 1);
        testReporter.publishEntry("testSubtractQuantity() made the new quantity " + mealList.get(0).getQuantity() + " (which is " + quantity + " - 1).");
    }

    @Test
    public void testDeleteMeal(TestReporter testReporter) {
        MealList testMealListItem = new MealList(1, "2", "test meal list item", 1);
        mealList.add(testMealListItem);
        int initialSize = mealList.size();
        mealList.remove(1);
        assertEquals(mealList.size(), 1);
        testReporter.publishEntry("testDeleteMeal() deleted last meal in list and the new list size is " + mealList.size() + " (which is equal to " + (initialSize) + " - 1)");
    }
}
