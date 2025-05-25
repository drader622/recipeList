import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeCategory } from '../../common/recipe-category';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-category-menu',
  templateUrl: './recipe-category-menu.component.html',
  styleUrl: './recipe-category-menu.component.css',
})
export class RecipeCategoryMenuComponent {
  recipeCategories: RecipeCategory[] = [];
  thePageNumber: number = 1;
  thePageSize: number = 5;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listRecipeCategories();
  }

  //lists the recipe categories on the navbar
  listRecipeCategories() {
    this.recipeService.getRecipeCategories().subscribe((data) => {
      this.recipeCategories = data;
    });
  }

  loadCategoryList(categoryId: number) {
    console.log(categoryId);
    this.recipeService
      .getRecipeListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        categoryId
      )
      .subscribe((data) => {
        console.log(data);
        this.recipeService.updateData(data);
      });
  }
}
