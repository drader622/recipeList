import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../common/recipe';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
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
}
