import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../common/recipe';
import { map } from 'rxjs/operators';
import { RecipeCategory } from '../../common/recipe-category';
import { Ingredient } from '../../common/ingredient';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl =
    'http://meal-list-env.eba-23z6rf8y.us-east-1.elasticbeanstalk.com/api/recipes';
  private categoryUrl =
    'http://meal-list-env.eba-23z6rf8y.us-east-1.elasticbeanstalk.com/api/recipe-category';
  private ingredientBaseUrl =
    'http://meal-list-env.eba-23z6rf8y.us-east-1.elasticbeanstalk.com/api/recipeIngredients';

  constructor(private httpClient: HttpClient) {}

  getRecipe(theRecipeId: number) {
    const recipeUrl = `${this.baseUrl}/${theRecipeId}`;

    return this.httpClient.get<Recipe>(recipeUrl);
  }

  getRecipeListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseRecipes> {
    //build URL based on category id
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseRecipes>(searchUrl);
  }

  //returns list of recipes based on which category is clicked
  getRecipeList(theCategoryId: number): Observable<Recipe[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getRecipes(searchUrl);
  }

  //returns list of recipes based on keyword entered into search
  searchRecipes(theKeyword: string) {
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`;

    return this.getRecipes(searchUrl);
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseRecipes> {
    const searchUrl =
      `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseRecipes>(searchUrl);
  }

  //gets every recipe found in the search
  private getRecipes(searchUrl: string): Observable<Recipe[]> {
    return this.httpClient
      .get<GetResponseRecipes>(searchUrl)
      .pipe(map((response) => response._embedded.recipes));
  }

  //gets every ingredient for the clicked on meal
  getIngredients(recipeId: number): Observable<Ingredient[]> {
    const searchUrl = `${this.ingredientBaseUrl}/search/findByRecipeId?id=${recipeId}`;
    return this.httpClient
      .get<GetResponseIngredients>(searchUrl)
      .pipe(map((response) => response._embedded.recipeIngredients));
  }

  //gets every category used for the meals
  getRecipeCategories(): Observable<RecipeCategory[]> {
    return this.httpClient
      .get<GetResponseRecipeCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.recipeCategory));
  }
}

interface GetResponseRecipes {
  _embedded: {
    recipes: Recipe[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseRecipeCategory {
  _embedded: {
    recipeCategory: RecipeCategory[];
  };
}

interface GetResponseIngredients {
  _embedded: {
    recipeIngredients: Ingredient[];
  };
}
