import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../common/recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list-grid.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(
      private recipeService: RecipeService, 
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listRecipes();
    });
    this.listRecipes();
  }
  listRecipes() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchRecipes();
    }
    else {
      this.handleListRecipes();
    }
  }

    handleSearchRecipes() {
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

      // now search for the recipes using keyword
      this.recipeService.searchRecipes(theKeyword).subscribe(
        data => {
          this.recipes = data;
        }
      )
    }
  handleListRecipes() {
    // check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // no category id available
      this.currentCategoryId = 1;
    }

    // get the recipes for given category id
    this.recipeService.getRecipeList(this.currentCategoryId).subscribe((data) => {
      this.recipes = data;
    });
  }

}
