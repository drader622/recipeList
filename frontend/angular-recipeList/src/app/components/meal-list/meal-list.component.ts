import { Component, OnInit } from '@angular/core';
import { MealListItem } from '../../common/meal-list-item';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  mealList: MealListItem[] = [];
  constructor(private groceryListService: GroceryListService) {}

  ngOnInit(): void {
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
}
