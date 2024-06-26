import { Component } from '@angular/core';
import { RecipeCategory } from '../../common/recipe-category';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-category-menu',
  templateUrl: './recipe-category-menu.component.html',
  styleUrl: './recipe-category-menu.component.css',
})
export class RecipeCategoryMenuComponent {
  recipeCategories: RecipeCategory[] = [];

  constructor(private recipeServices: RecipeService) {}

  ngOnInit() {
    this.listRecipeCategories();
  }
  listRecipeCategories() {
    this.recipeServices.getRecipeCategories().subscribe((data) => {
      console.log('Recipe Categories=' + JSON.stringify(data));
      this.recipeCategories = data;
    });
  }
}
