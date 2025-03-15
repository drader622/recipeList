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

  listMealList() {
    this.groceryListService.getMealList().subscribe((data) => {
      data.forEach((item) => this.mealList.push(item));
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
    let component = document.getElementById('ingredientComponent');
    // let closeButton = document.getElementById('closeBtn');
    component?.classList.remove('hidden');
    // closeButton?.classList.remove('hidden');
  }

  closeIngredients() {
    let component = document.getElementById('ingredientComponent');

    component?.classList.add('hidden');
  }
}
