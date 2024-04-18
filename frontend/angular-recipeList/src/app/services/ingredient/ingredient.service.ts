import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Ingredient } from '../../common/ingredient';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private baseUrl = 'http://localhost:8080/api/recipeIngredients';

  constructor(private httpClient: HttpClient) { }
  
  getIngredient(theIngredientId: number) {
    const ingredientUrl = `${this.baseUrl}/${theIngredientId}`;

    return this.httpClient.get<Ingredient>(ingredientUrl);
  }

  getIngredientList(theRecipeId: number): Observable<Ingredient[]> {
    console.log(`The recipe Id: ${theRecipeId}`);
    const searchUrl = `${this.baseUrl}/search/findById?id=${theRecipeId}`;

    return this.getIngredients(searchUrl);
  }

  private getIngredients(searchUrl: string): Observable<Ingredient[]> {
    return this.httpClient
      .get<GetResponseIngredients>(searchUrl)
      .pipe(map((response) => response._embedded.ingredients));
  }
}

interface GetResponseIngredients {
  _embedded: {
    ingredients: Ingredient[];
  }
}
