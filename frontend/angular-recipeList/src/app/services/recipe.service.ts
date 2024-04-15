import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../common/recipe';
import { map } from 'rxjs/operators';
import { RecipeCategory } from '../common/recipe-category';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:8080/api/recipes';
  private categoryUrl = 'http://localhost:8080/api/recipe-category';

  constructor(private httpClient: HttpClient) {}

  getRecipe(theRecipeId: number) {
    // need to build URL based on recipe id
    const recipeUrl = `${this.baseUrl}/${theRecipeId}`;

    return this.httpClient.get<Recipe>(recipeUrl);
  }

  getRecipeList(theCategoryId: number): Observable<Recipe[]> {
    //build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getRecipes(searchUrl);
  }

  searchRecipes(theKeyword: string) {
    // need to build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`;

    return this.getRecipes(searchUrl);
  }

  private getRecipes(searchUrl: string): Observable<Recipe[]> {
    return this.httpClient
      .get<GetResponseRecipes>(searchUrl)
      .pipe(map((response) => response._embedded.recipes));
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
}

interface GetResponseRecipeCategory {
  _embedded: {
    recipeCategory: RecipeCategory[];
  };
}
