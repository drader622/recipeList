import { Injectable } from '@angular/core';
import { GroceryListItem } from '../../common/grocery-list-item';
import { MealListItem } from '../../common/meal-list-item';
import { map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../common/recipe';
import { Ingredient } from '../../common/ingredient';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroceryListService {
  private baseUrl = `${environment.apiEndpoint}/meal-list`;
  groceryListItems: GroceryListItem[] = [];
  mealList: MealListItem[] = [];
  ingredients: Ingredient[] = [];
  mealListItem: any;
  newId = 0;

  totalQuantity: Subject<number> = new Subject<number>();
  newMeal: MealListItem | undefined;
  constructor(private httpClient: HttpClient) {}

  //returns entire meal list
  getMealList(): Observable<MealListItem[]> {
    const mealListUrl = `${this.baseUrl}`;

    return this.getMeals(mealListUrl);
  }

  //puts new meal in meal list repository
  addMealToList(meal: MealListItem): Observable<any> {
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  //deletes meal from meal list repository
  deleteItemFromList(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  //puts meal quantity into proper row after adding 1
  increaseQuantity(meal: MealListItem) {
    meal.quantity++;
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  //puts meal quantity into proper row after subtracting 1
  decreaseQuantity(meal: MealListItem) {
    meal.quantity--;
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  //clears all of data from table
  clearMealList(): Observable<any> {
    this.mealList = [];

    const deleteUrl = `${this.baseUrl}/clear`;
    return this.httpClient.delete(`${deleteUrl}`);
  }

  //gets each ingredient from the meal passed and adds each one to the list
  addIngredientsToTotal(meal: MealListItem, quantity: number) {
    let url = `${environment.apiEndpoint}/recipeIngredients/search/findByRecipeId?id=${meal.recipeId}`;
    while (quantity >= 1) {
      this.httpClient.get<GetResponseIngredients>(url).subscribe((val) =>
        val._embedded.recipeIngredients.forEach((item) => {
          this.ingredients.push(item);
          this.updateIngredientToList(item, true);
        })
      );
      quantity--;
    }
  }

  subtractIngredientsFromTotal(meal: MealListItem, quantity: number) {
    let url = `${environment.apiEndpoint}/recipeIngredients/search/findByRecipeId?id=${meal.recipeId}`;
    while (quantity >= 1) {
      this.httpClient.get<GetResponseIngredients>(url).subscribe((val) =>
        val._embedded.recipeIngredients.forEach((item) => {
          // while (quantity >= 1) {
          this.updateIngredientToList(item, false);
          // quantity--;
          // }
        })
      );
      quantity--;
    }
  }

  //adds ingredient to total ingredient list
  updateIngredientToList(theGroceryListItem: GroceryListItem, add: Boolean) {
    let alreadyExistsInList: boolean = false;
    let existingListItem: GroceryListItem = undefined!;
    let index = -1;

    if (this.groceryListItems.length > 0) {
      // find the item in the cart based on item id
      existingListItem = this.groceryListItems.find(
        (tempGroceryItem) => tempGroceryItem.name === theGroceryListItem.name
      )!;

      // check if we found it
      alreadyExistsInList = existingListItem != undefined;
    }

    if (
      theGroceryListItem.unit != 'oz' &&
      theGroceryListItem.unit != 'units' &&
      theGroceryListItem.unit != 'fl. oz'
    ) {
      theGroceryListItem.amount = convertUnit(
        theGroceryListItem.unit,
        theGroceryListItem.amount
      );
    }

    if (alreadyExistsInList) {
      // increment the quantity

      this.groceryListItems.forEach((item, i) => {
        if (theGroceryListItem.name == item.name) {
          index = i;
        }
      });

      if (add) {
        theGroceryListItem.amount =
          theGroceryListItem.amount + existingListItem.amount;
      } else {
        theGroceryListItem.amount =
          existingListItem.amount - theGroceryListItem.amount;
      }

      if (theGroceryListItem.amount === 0) {
        this.groceryListItems.splice(index, 1);
      } else {
        this.groceryListItems[index].amount = theGroceryListItem.amount;
      }
    } else {
      // just add the item to the array
      this.groceryListItems.push(theGroceryListItem);
    }
  }

  //adds ingredient from recipe to meal list and then computes total ingredients for entire meal list
  updateMealList(newRecipe: Recipe, add: Boolean) {
    let mealList: MealListItem[] = [];
    this.mealListItem = undefined;
    this.getMealList().subscribe((data) => {
      mealList = data;

      this.mealListItem = mealList.find((tempMealItem) => {
        return Number(tempMealItem.recipeId) == newRecipe.id;
      });

      if (this.mealListItem) {
        if (add) {
          this.mealListItem.quantity++;
        } else {
          this.mealListItem.quantity--;
        }

        this.addMealToList(this.mealListItem).subscribe();

        let mealListStatusComp = document.getElementById('quantity');
        let mealListQuantity = mealListStatusComp?.innerText;
        let newQuantity = 0;
        if (add) {
          newQuantity = Number(mealListQuantity) + 1;
        } else {
          newQuantity = Number(mealListQuantity) - 1;
        }

        if (mealListStatusComp)
          mealListStatusComp.innerHTML = newQuantity.toString();
        if (add) {
          this.addIngredientsToTotal(this.mealListItem, 1);
        } else {
          this.subtractIngredientsFromTotal(this.mealListItem, 1);
        }

        this.computeListTotal();
      } else {
        const newMeal = new MealListItem(
          this.newId,
          newRecipe.id,
          newRecipe.title,
          1
        );
        this.newId++;
        this.addMealToList(newMeal).subscribe();

        // CHANGE STATUS COMP TEXT && UPDATE INGREDIENTS
        let mealListStatusComp = document.getElementById('quantity');
        let mealListQuantity = mealListStatusComp?.innerText;
        let newQuantity = Number(mealListQuantity) + 1;
        if (mealListStatusComp)
          mealListStatusComp.innerHTML = newQuantity.toString();
        this.addIngredientsToTotal(newMeal, 1);
      }
    });
  }

  //computes total quantity for each ingredient in total list
  computeListTotal() {
    let totalQuantityValue: number = 0;

    for (let currentGroceryListItem of this.groceryListItems) {
      totalQuantityValue += currentGroceryListItem.amount;
    }

    // publish the new values .. all subscribers will receive the new data
    this.totalQuantity.next(totalQuantityValue);
  }

  //gets total ingredients
  getTotalIngredients() {
    return this.groceryListItems;
  }

  private getMeals(mealListUrl: string): Observable<MealListItem[]> {
    return this.httpClient
      .get<GetResponseMealList>(mealListUrl)
      .pipe(map((response) => response._embedded.mealList));
  }
}

function convertUnit(unit: String, amount: number) {
  switch (unit) {
    case 'cup':
      return amount * 8;
      break;
    case 'Tbsp.':
      return amount * 0.5;
      break;
    case 'tsp':
      return amount * 0.1666667;
      break;
    default:
      return amount;
      break;
  }
}

interface GetResponseMealList {
  _embedded: {
    mealList: MealListItem[];
  };
}

interface GetResponseIngredients {
  _embedded: {
    recipeIngredients: Ingredient[];
  };
}
