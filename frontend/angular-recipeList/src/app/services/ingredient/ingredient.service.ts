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
    const searchURL = `${this.baseUrl}/search/findByRecipeId?id=${theRecipeId}`;

    this.ingredients = [];

    this.httpClient.get<GetResponseIngredients>(searchURL).subscribe((val) =>
      val._embedded.recipeIngredients.forEach((item) => {
        if (!JSON.stringify(this.ingredients).includes(JSON.stringify(item))) {
          this.ingredients.push(item);
        }
      })
    );

    return this.ingredients;
  }
}

interface GetResponseIngredients {
  _embedded: {
    recipeIngredients: Ingredient[];
  };
}
