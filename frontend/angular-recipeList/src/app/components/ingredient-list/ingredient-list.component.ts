import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../common/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe/recipe.service';
import { Recipe } from '../../common/recipe';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css',
})
export class IngredientListComponent implements OnInit {
  ingredient!: Ingredient | null;

  ingredients: Ingredient[] = [];
  recipe!: Recipe;
  mealListPage: boolean = false;

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleSearchIngredients();
    });
  }

  handleSearchIngredients() {
    let theRecipeId = 0;

    //determine if component was generated from 'recipes' or 'meal-list' route
    if (this.route.snapshot.url[0].path == 'recipes') {
      theRecipeId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      theRecipeId = +this.route.snapshot.paramMap.get('id')!;
      this.mealListPage = true;
    }

    this.ingredients = [];

    //gets total ingredient list for selected recipe and puts data in recipe to be rendered
    if (theRecipeId != 0) {
      this.ingredients = this.ingredientService.getIngredientList(theRecipeId);
      this.recipeService.getRecipe(theRecipeId).subscribe((data) => {
        this.recipe = data;
      });
    }
  }
}
