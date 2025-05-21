import { Component, Inject, OnInit } from '@angular/core';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { MealListItem } from '../../common/meal-list-item';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { CustomUserClaims, OktaAuth, UserClaims } from '@okta/okta-auth-js';
import { LoginService } from '../../services/login/login.service';
import { RefreshService } from '../../services/refreshService/refresh.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrl: './purchase-details.component.css',
})
export class PurchaseDetailsComponent implements OnInit {
  mealList: MealListItem[] = [];
  purchaseTotal: number = 0;
  orderNumber: number = 12334567;
  username: string | undefined;
  email: string | undefined;
  isAuthenticated: Boolean = false;
  guest: boolean = false;

  constructor(
    private groceryListService: GroceryListService,
    private loginService: LoginService,
    private refreshService: RefreshService
  ) {}
  ngOnInit(): void {
    this.guest = false;
    this.getUser();
    this.showPurchasedMeals();
  }

  //display in table each meal that was purchased, the quantity of the meals, and the price per meal
  showPurchasedMeals() {
    this.groceryListService.getMealList().subscribe((data) => {
      this.mealList = data;
      this.getPurchaseTotal();
      this.clearMealList();
      this.orderNumber = this.generateOrderNum();
      let mealListStatusComp = document.getElementById('quantity');
      let newQuantity = 0;
      if (mealListStatusComp)
        mealListStatusComp.innerHTML = newQuantity.toString();
    });
  }

  //gets the total amount owed for entire meal list
  getPurchaseTotal() {
    this.mealList.forEach((meal) => {
      this.purchaseTotal = this.purchaseTotal + meal.quantity * 8.99;
    });
  }

  //clears entire meal list repository once order is purchased
  clearMealList() {
    this.groceryListService.clearMealList().subscribe({});
  }

  //generates random 7 digit number for order number
  generateOrderNum(): number {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getUser() {
    this.loginService.getAuthState().subscribe((response) => {
      this.isAuthenticated = response;
      this.refreshService.triggerRefresh();
      if (this.isAuthenticated) {
        console.log('user is authenticated');
        this.getUserDetails();
      } else {
        console.log('no user');
        this.guest = true;
        this.username = 'Guest';
      }
    });
  }
  getUserDetails() {
    // Fetch the logged in user details
    if (this.isAuthenticated) {
      this.loginService.getUser().subscribe((data) => {
        this.username = data.username;
        this.email = data.email;
      });
    }
  }
}
