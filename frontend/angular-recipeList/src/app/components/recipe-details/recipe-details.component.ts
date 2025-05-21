import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../common/recipe';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { Ingredient } from '../../common/ingredient';
import { RefreshService } from '../../services/refreshService/refresh.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  ingredient!: Ingredient;
  ingredients: Ingredient[] = [];
  constructor(
    private recipeService: RecipeService,
    private groceryListService: GroceryListService,
    private refreshService: RefreshService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refreshService.triggerRefresh();
    this.route.paramMap.subscribe(() => {
      this.handleRecipeDetails();
    });
  }

  //gets recipe and displays all the details including a detailed list of ingredients
  handleRecipeDetails() {
    const theRecipeId: number = +this.route.snapshot.paramMap.get('id')!;

    this.recipeService.getRecipe(theRecipeId).subscribe((data) => {
      this.recipe = data;
    });
  }

  //adds meal to meal list when button is clicked
  addToList() {
    this.groceryListService.updateMealList(this.recipe, true);
  }
}
