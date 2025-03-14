import { Injectable } from '@angular/core';
import { GroceryListItem } from '../../common/grocery-list-item';
import { MealListItem } from '../../common/meal-list-item';
import { map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../common/recipe';
import { GroceryListStatusComponent } from '../../components/grocery-list-status/grocery-list-status.component';

@Injectable({
  providedIn: 'root',
})
export class GroceryListService {
  private baseUrl = 'http://localhost:8080/api/meal-list';
  groceryListItems: GroceryListItem[] = [];
  mealList: MealListItem[] = [];
  mealListItem: any;
  newId = 0;

  totalQuantity: Subject<number> = new Subject<number>();
  newMeal: MealListItem | undefined;
  constructor(
    private httpClient: HttpClient,
  ) {}

  getMealList(): Observable<MealListItem[]> {
    const mealListUrl = `${this.baseUrl}`;

    return this.getMeals(mealListUrl);
  }

  addMealToList(meal: MealListItem): Observable<any> {
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  deleteItemFromList(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  increaseQuantity(meal: MealListItem) {
    meal.quantity++;
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  decreaseQuantity(meal: MealListItem) {
    meal.quantity--;
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  addIngredientToList(theGroceryListItem: GroceryListItem) {
    let alreadyExistsInList: boolean = false;
    let existingListItem: GroceryListItem = undefined!;

    if (this.groceryListItems.length > 0) {
      // find the item in the cart based on item id
      existingListItem = this.groceryListItems.find(
        (tempGroceryItem) => tempGroceryItem.id === theGroceryListItem.id
      )!;

      // check if we found it
      alreadyExistsInList = existingListItem != undefined;
    }

    // convert to ounces
    console.log(theGroceryListItem.unit);
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
      existingListItem.amount += theGroceryListItem.amount;
    } else {
      // just add the item to the array
      this.groceryListItems.push(theGroceryListItem);
      this.groceryListItems.forEach((item) =>
        console.log(`Item: ${item.name}`)
      );
    }

    // compute cart total price and total quantity
    // this.computeListTotal();
  }

  updateMealList(newRecipe: Recipe) {
    let statusComponent = GroceryListStatusComponent;
    const recipeId: number = newRecipe.id;
    let mealList: MealListItem[] = [];
    this.mealListItem = undefined;
    let mealListQuantity = 0;
    this.getMealList().subscribe((data) => {
      mealList = data;

      this.mealListItem = mealList.find((tempMealItem) => {
        return Number(tempMealItem.recipeId) == newRecipe.id;
      });

      if (this.mealListItem) {
        this.mealListItem.quantity++;
        this.addMealToList(this.mealListItem).subscribe();
        this.getMealList().subscribe((data) => {
          data.forEach((item) => (mealListQuantity += item.quantity));
          statusComponent.prototype.toggleComponent();
        });
      } else {
        const newMeal = new MealListItem(
          this.newId,
          newRecipe.id,
          newRecipe.title,
          1
        );
        this.newId++;
        this.addMealToList(newMeal).subscribe();
        statusComponent.prototype.toggleComponent();
      }
    });
  }

  computeListTotal() {
    let totalQuantityValue: number = 0;

    for (let currentGroceryListItem of this.groceryListItems) {
      totalQuantityValue += currentGroceryListItem.amount;
    }

    // publish the new values .. all subscribers will receive the new data
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purposes
    // this.logGroceryListData(totalQuantityValue);
  }
  logGroceryListData(totalQuantityValue: number) {
    console.log(`Contents of the cart`);
    for (let tempGroceryItem of this.groceryListItems) {
      console.log(
        `name: ${tempGroceryItem.name}, amount: ${tempGroceryItem.amount} oz`
      );
    }

    console.log(`totalQuantity: ${totalQuantityValue}`);
    console.log(`---`);
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
