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
  private baseUrl = 'http://localhost:8080/api/recipes';
  private categoryUrl = 'http://localhost:8080/api/recipe-category';
  private ingredientBaseUrl = 'http://localhost:8080/api/recipeIngredients';

  constructor(private httpClient: HttpClient) {}

  getRecipe(theRecipeId: number) {
    // need to build URL based on recipe id
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

  getRecipeList(theCategoryId: number): Observable<Recipe[]> {
    //build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getRecipes(searchUrl);
  }

  // getIngredientList(theCategoryId: number) {
  //   const ingredientUrl = `${this.baseUrl}/search/findByRecipeId?id=${theCategoryId}`;

  //   return this.getIngredients(ingredientUrl);
  // }

  searchRecipes(theKeyword: string) {
    // need to build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`;

    return this.getRecipes(searchUrl);
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseRecipes> {
    //need to build URL based on keyword, page, and size
    const searchUrl =
      `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseRecipes>(searchUrl);
  }

  private getRecipes(searchUrl: string): Observable<Recipe[]> {
    return this.httpClient
      .get<GetResponseRecipes>(searchUrl)
      .pipe(map((response) => response._embedded.recipes));
  }

  getIngredients(recipeId: number): Observable<Ingredient[]> {
    const searchUrl = `${this.ingredientBaseUrl}/search/findByRecipeId?id=${recipeId}`;
    return this.httpClient
      .get<GetResponseIngredients>(searchUrl)
      .pipe(map((response) => response._embedded.recipeIngredients));
  }

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
