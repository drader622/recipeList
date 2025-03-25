import { Component, OnInit } from '@angular/core';
import { MealListItem } from '../../common/meal-list-item';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../../services/ingredient/ingredient.service';
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

  constructor(
    private groceryListService: GroceryListService,
    private ingredientService: IngredientService,
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
  }

  listMealList() {
    this.groceryListService.getMealList().subscribe((data) => {
      data.forEach((item) => this.mealList.push(item));
      if (this.mealList.length > 0) {
        let groceryListItems = this.groceryListService.getTotalIngredients();
        if (groceryListItems.length === 0) {
          console.log(true);
          this.mealList.forEach((meal) => {
            let recipe;
            let amountOfMeals = meal.quantity;

            // this.recipeService.getIngredients(meal.recipeId).subscribe(data => {
            //   recipe = data;
            //   console.log(data);
            // })
            while (amountOfMeals > 0) {
              this.groceryListService.addIngredientsToTotal(meal);
              amountOfMeals--;
            }
          });
        }
      }
    });
  }

  deleteItem(id: number) {
    this.groceryListService.deleteItemFromList(id).subscribe();
    location.reload();
  }

  increaseQuantity(meal: MealListItem) {
    this.groceryListService.increaseQuantity(meal).subscribe();
    location.reload();
  }

  decreaseQuantity(meal: MealListItem) {
    this.groceryListService.decreaseQuantity(meal).subscribe();
    location.reload();
  }

  showIngredients() {
    this.showIngredientList = true;
  }

  showTotalIngredients() {
    this.showTotalIngredientList = true;
    let component = document.getElementById('ingredientComponent');
    component?.classList.remove('hidden');
  }
}
