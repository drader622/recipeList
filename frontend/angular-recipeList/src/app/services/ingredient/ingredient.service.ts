import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

    // this.getIngredientList(theIngredientId);

    return this.httpClient.get<Ingredient>(ingredientUrl);
  }

  getIngredientList(theRecipeId: number): Ingredient[] {
    const searchURL = `${this.baseUrl}/search/findByRecipeId?id=${theRecipeId}`;
    // console.log('success');

    this.httpClient
      .get<GetResponseIngredients>(searchURL)
      .subscribe((val) => val._embedded.recipeIngredients.forEach(item => this.ingredients.push(item)));
    
    console.log(this.ingredients[0]);

    return this.ingredients;
  }

  private getIngredients(searchUrl: string): void {
    // console.log('success');
    // this.httpClient
    //   .get<GetResponseIngredients>(searchUrl)
    //   .pipe(map((response) => response._embedded.recipeIngredients));

    // console.log(
    //   this.httpClient
    //     .get<GetResponseIngredients>(searchUrl)
    //     .pipe(map((response) => response._embedded.recipeIngredients))
    // );

    // return this.httpClient
    //   .get<GetResponseIngredients>(searchUrl)
    //   .pipe(map((response) => response._embedded.recipeIngredients));
  }
}

interface GetResponseIngredients {
  _embedded: {
    recipeIngredients: Ingredient[];
  }
}
