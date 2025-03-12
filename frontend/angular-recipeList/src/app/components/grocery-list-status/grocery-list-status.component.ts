import { Component, OnInit } from '@angular/core';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-grocery-list-status',
  templateUrl: './grocery-list-status.component.html',
  styleUrl: './grocery-list-status.component.css',
})
export class GroceryListStatusComponent implements OnInit {
  totalQuantity: number = 0;
  public static show: boolean = true;
  public showComponent: boolean = true;
  static totalQuantity: number;

  constructor(private groceryListService: GroceryListService) {}

  ngOnInit(): void {
    this.showComponent = false;
    this.updateGroceryListStatus();
  }
  updateGroceryListStatus() {
    this.showComponent = true;
    this.groceryListService.getMealList().subscribe((data) => {
      data.forEach((item) => (this.totalQuantity += item.quantity));
    });
  }
  toggleComponent() {
    location.reload();
  }
}
