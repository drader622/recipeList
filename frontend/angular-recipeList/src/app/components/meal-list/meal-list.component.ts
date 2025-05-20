import { Component, OnInit } from '@angular/core';
import { MealListItem } from '../../common/meal-list-item';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  mealList: MealListItem[] = [];
  hiddenClass: string = 'hidden';
  showIngredientList: Boolean = false;
  showTotalIngredientList: Boolean = false;
  showComponent: Boolean = false;

  constructor(
    private groceryListService: GroceryListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let component = document.getElementById('ingredientComponent');
    component?.classList.add(this.hiddenClass);
    let id = +this.route.snapshot.paramMap.get('id')!;
    if (id > 0) {
      this.showIngredients();
    }
    this.listMealList();
    this.showComponent = true;
  }

  //displays each meal in meal list
  listMealList() {
    this.mealList = [];
    this.groceryListService.getMealList().subscribe((data) => {
      data.forEach((item) => this.mealList.push(item));
      if (this.mealList.length > 0) {
        let groceryListItems = this.groceryListService.getTotalIngredients();

        //if meal list has meals but ingredient total is empty, then the quantity will have to be calculated when displaying each meal
        if (groceryListItems.length === 0) {
          this.mealList.forEach((meal) => {
            let amountOfMeals = meal.quantity;
            while (amountOfMeals > 0) {
              this.groceryListService.addIngredientsToTotal(meal, 1);
              amountOfMeals--;
            }
          });
        }
      }
    });
  }

  //delete meal from meal list
  deleteItem(meal: MealListItem) {
    this.groceryListService.deleteItemFromList(meal.id).subscribe();
    setTimeout(() => {
      this.updateGroceryListAmount(meal.quantity);
      document.getElementById(meal.id.toString())?.classList.add('hidden');
      this.groceryListService.subtractIngredientsFromTotal(meal, meal.quantity);
    }, 100);
  }

  //increase quantity of meal on meal list
  increaseQuantity(meal: MealListItem) {
    let quantityComp = document
      .getElementById(meal.id.toString())
      ?.querySelector('.mealQuantity');
    let quantity = Number(quantityComp?.textContent);
    quantity++;
    if (quantityComp) quantityComp.textContent = quantity.toString();

    this.groceryListService.increaseQuantity(meal);
    setTimeout(() => {
      this.recipeService.getRecipe(meal.recipeId).subscribe((data) => {
        let recipe = data;
        this.groceryListService.updateMealList(recipe, true);
      });
    }, 100);
  }

  //decrease quantity of meal on meal list
  decreaseQuantity(meal: MealListItem) {
    let quantityComp = document
      .getElementById(meal.id.toString())
      ?.querySelector('.mealQuantity');
    let quantity = Number(quantityComp?.textContent);
    quantity--;
    if (quantityComp) quantityComp.textContent = quantity.toString();
    if (quantity === 0) {
      this.deleteItem(meal);
    } else {
      this.groceryListService.decreaseQuantity(meal);
      setTimeout(() => {
        this.recipeService.getRecipe(meal.recipeId).subscribe((data) => {
          let recipe = data;
          this.groceryListService.updateMealList(recipe, false);
        });
      }, 100);
    }
  }

  //shows ingredients for each meal when the show ingredients button is clicked
  showIngredients() {
    this.showTotalIngredientList = false;
    this.showIngredientList = true;
    document.getElementById('closeBtn')?.classList.remove('hidden');
  }

  //shows total ingredients for entire meal list when show total ingredients is clicked
  showTotalIngredients() {
    this.groceryListService.getTotalIngredients();
    let component = document.getElementById('ingredientComponent');
    component?.classList.remove('hidden');
    this.showIngredientList = false;
    this.showTotalIngredientList = true;
  }

  updateGroceryListAmount(amount: number) {
    let quantityElement = document.getElementById('quantity');
    let quantity = Number(quantityElement?.textContent);

    quantity = quantity - amount;

    if (quantityElement) quantityElement.innerHTML = quantity.toString();
  }
}
