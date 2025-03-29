import { Component, OnInit } from '@angular/core';
import { MealListItem } from '../../common/meal-list-item';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private groceryListService: GroceryListService,
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
  }

  //displays each meal in meal list
  listMealList() {
    this.groceryListService.getMealList().subscribe((data) => {
      data.forEach((item) => this.mealList.push(item));
      if (this.mealList.length > 0) {
        let groceryListItems = this.groceryListService.getTotalIngredients();

        //if meal list has meals but ingredient total is empty, then the quantity will have to be calculated when displaying each meal
        if (groceryListItems.length === 0) {
          this.mealList.forEach((meal) => {
            let amountOfMeals = meal.quantity;
            while (amountOfMeals > 0) {
              this.groceryListService.addIngredientsToTotal(meal);
              amountOfMeals--;
            }
          });
        }
      }
    });
  }

  //delete meal from meal list
  deleteItem(id: number) {
    this.groceryListService.deleteItemFromList(id).subscribe();
    location.reload();
  }

  //increase quantity of meal on meal list
  increaseQuantity(meal: MealListItem) {
    this.groceryListService.increaseQuantity(meal).subscribe();
    location.reload();
  }

  //decrease quantity of meal on meal list
  decreaseQuantity(meal: MealListItem) {
    this.groceryListService.decreaseQuantity(meal).subscribe();
    location.reload();
  }

  //shows ingredients for each meal when the show ingredients button is clicked
  showIngredients() {
    this.showTotalIngredientList = false;
    this.showIngredientList = true;
    document.getElementById('closeBtn')?.classList.remove('hidden');
  }

  //shows total ingredients for entire meal list when show total ingredients is clicked
  showTotalIngredients() {
    this.showIngredientList = false;
    this.showTotalIngredientList = true;
  }
}
