import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../../common/ingredient';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private baseUrl = 'http://localhost:8080/api/recipeIngredients';
  ingredients: Ingredient[] = [];

  constructor(private httpClient: HttpClient) {}

  getIngredient(theIngredientId: number) {
    const ingredientUrl = `${this.baseUrl}/${theIngredientId}`;

    return this.httpClient.get<Ingredient>(ingredientUrl);
  }

  getIngredientList(theRecipeId: number): Ingredient[] {
    console.log(`Recipe ID: ${theRecipeId}`);
    const searchURL = `${this.baseUrl}/search/findByRecipeId?id=${theRecipeId}`;

    this.ingredients = [];

    this.httpClient
      .get<GetResponseIngredients>(searchURL)
      .subscribe((val) =>
        val._embedded.recipeIngredients.forEach((item) =>
          this.ingredients.push(item)
        )
      );

    console.log(this.ingredients);

    return this.ingredients;
  }
  getIngredientsForGrocery(theRecipeId: number) {
    console.log(`Recipe ID: ${theRecipeId}`);
    const searchURL = `${this.baseUrl}/search/findByRecipeId?id=${theRecipeId}`;

    this.ingredients = [];

    return this.httpClient.get<GetResponseIngredients>(searchURL)
  }
}

interface GetResponseIngredients {
  _embedded: {
    recipeIngredients: Ingredient[];
  };
}
