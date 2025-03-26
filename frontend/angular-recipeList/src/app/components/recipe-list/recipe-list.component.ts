import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe/recipe.service';
import { Recipe } from '../../common/recipe';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../../common/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { GroceryListItem } from '../../common/grocery-list-item';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { MealListItem } from '../../common/meal-list-item';
import { GroceryListStatusComponent } from '../grocery-list-status/grocery-list-status.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list-grid.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  ingredients: Ingredient[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  previousKeyword: string = '';
  mealListItem: any;
  newId = 0;
  totalMeals: number = 0;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private groceryListService: GroceryListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listRecipes();
    });
    this.listRecipes();
  }
  //determines if component was generated from search or not and handles recipes accordingly
  listRecipes() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchRecipes();
    } else {
      this.handleListRecipes();
    }
  }

  //when a keyword is searched each meal found with the word is returned in a list
  handleSearchRecipes() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    // now search for the recipes using keyword
    this.recipeService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  //displays list of recipes in a paginated list 
  handleListRecipes() {
    // check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // no category id available
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.recipeService
      .getRecipeListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listRecipes();
  }

  processResult() {
    return (data: any) => {
      this.recipes = data._embedded.recipes;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  //adds meal to meal list when button is clicked
  addToList(theRecipe: Recipe) {
    this.groceryListService.updateMealList(theRecipe);
  }
}
