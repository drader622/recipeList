import { Injectable } from '@angular/core';
import { GroceryListItem } from '../../common/grocery-list-item';
import { MealListItem } from '../../common/meal-list-item';
import { map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../common/recipe';
import { GroceryListStatusComponent } from '../../components/grocery-list-status/grocery-list-status.component';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../../common/ingredient';

@Injectable({
  providedIn: 'root',
})
export class GroceryListService {
  private baseUrl = 'http://localhost:8080/api/meal-list';
  groceryListItems: GroceryListItem[] = [];
  mealList: MealListItem[] = [];
  ingredients: Ingredient[] = [];
  mealListItem: any;
  newId = 0;

  // private dataUpdatedSource = new Subject<void>();
  // dataUpdated$ = this.dataUpdatedSource.asObservable();

  // notifyDataUpdated() {
  //   this.dataUpdatedSource.next();
  // }

  totalQuantity: Subject<number> = new Subject<number>();
  newMeal: MealListItem | undefined;
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {}

  getMealList(): Observable<MealListItem[]> {
    const mealListUrl = `${this.baseUrl}`;

    return this.getMeals(mealListUrl);
  }

  addMealToList(meal: MealListItem): Observable<any> {
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  deleteItemFromList(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  increaseQuantity(meal: MealListItem) {
    meal.quantity++;
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  decreaseQuantity(meal: MealListItem) {
    meal.quantity--;
    return this.httpClient.post<MealListItem>(this.baseUrl, meal);
  }

  addIngredientsToTotal(meal: MealListItem) {
    let url = `http://localhost:8080/api/recipeIngredients/search/findByRecipeId?id=${meal.recipeId}`;
    this.httpClient.get<GetResponseIngredients>(url).subscribe((val) =>
      val._embedded.recipeIngredients.forEach((item) => {
        this.ingredients.push(item);
        console.log(item);
      })
    );

    // this.ingredients = this.ingredientService.getIngredientList(meal.recipeId);
    console.log(this.ingredients);
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
        // this.addIngredientsToTotal(this.mealListItem);

        // JUST CHANGE THE ELEMENT TO EQUAL QUANTITY + 1. THEN TAKE DATA FROM MEAL PAGE NEEDED WHEN ADDING INGREDIENTS
        this.getMealList().subscribe((data) => {
          data.forEach((item) => (mealListQuantity += item.quantity));
          console.log(mealListQuantity);
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
        // this.addIngredientsToTotal(newMeal);
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
    // console.log(`mealList: ${mealListUrl}`)
    // console.log('success: ' +
    //   this.httpClient.get<GetResponseMealList>(mealListUrl).pipe(map((response) => response._embedded.mealList.forEach(item => console.log(item)))
        
    // );
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
