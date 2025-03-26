import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { MealListItem } from '../../common/meal-list-item';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrl: './purchase-details.component.css',
})
export class PurchaseDetailsComponent implements OnInit {
  mealList: MealListItem[] = [];
  purchaseTotal: number = 0;

  constructor(private groceryListService: GroceryListService) {}
  ngOnInit(): void {
    this.showPurchasedMeals();
  }

  showPurchasedMeals() {
    this.groceryListService.getMealList().subscribe((data) => {
      this.mealList = data;
      console.log(this.mealList);
      this.getPurchaseTotal();
      this.clearMealList();
      let mealListStatusComp = document.getElementById('quantity');
      let mealListQuantity = mealListStatusComp?.innerText;
      let newQuantity = 0;
      if (mealListStatusComp)
        mealListStatusComp.innerHTML = newQuantity.toString();
    });
  }

  getPurchaseTotal() {
    this.mealList.forEach((meal) => {
      this.purchaseTotal = this.purchaseTotal + meal.quantity * 8.99;
    });
  }

  clearMealList() {
    this.groceryListService.clearMealList().subscribe({});
  }
}
