import { Component, OnInit } from '@angular/core';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { MealListItem } from '../../common/meal-list-item';
import { GroceryListItem } from '../../common/grocery-list-item';

@Component({
  selector: 'app-total-ingredient-list',
  templateUrl: './total-ingredient-list.component.html',
  styleUrl: './total-ingredient-list.component.css',
})
export class TotalIngredientListComponent implements OnInit {
  ingredients: GroceryListItem[] = [];

  constructor(private groceryListService: GroceryListService) {}

  ngOnInit(): void {
    this.getTotalIngredients();
  }

  getTotalIngredients() {
    this.ingredients = this.groceryListService.getTotalIngredients();
    console.log(this.groceryListService.getTotalIngredients());
  }

  closeIngredients() {
    let component = document.getElementById('ingredientComponent');
    component?.classList.add('hidden');
    // location.reload();
  }
}
