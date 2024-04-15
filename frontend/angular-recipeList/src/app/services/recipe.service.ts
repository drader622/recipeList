import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../common/recipe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8080/api/recipes';

  constructor(private httpClient: HttpClient) { }

  getRecipeList(theCategoryId: number): Observable<Recipe[]> {

    //build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.recipes)
    );
  }
}

interface GetResponse {
  _embedded: {
    recipes: Recipe[];
  }
}
