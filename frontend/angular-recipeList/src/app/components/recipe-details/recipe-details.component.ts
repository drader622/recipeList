import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../common/recipe';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { GroceryListItem } from '../../common/grocery-list-item';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { Ingredient } from '../../common/ingredient';
import { MealListItem } from '../../common/meal-list-item';
import { GroceryListStatusComponent } from '../grocery-list-status/grocery-list-status.component';
import { IngredientService } from '../../services/ingredient/ingredient.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  ingredient!: Ingredient;
  mealListItem: any;
  ingredients: Ingredient[] = [];
  newId = 0;

  constructor(
    private recipeService: RecipeService,
    private groceryListService: GroceryListService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleRecipeDetails();
    });
  }
  handleRecipeDetails() {
    const theRecipeId: number = +this.route.snapshot.paramMap.get('id')!;

    this.recipeService.getRecipe(theRecipeId).subscribe((data) => {
      this.recipe = data;
    });
    // ADD METHOD TO getIngredients from recipe.service.ts to implement the ingredients on the page.
  }

  addToList() {
    this.groceryListService.updateMealList(this.recipe);
  }
}
