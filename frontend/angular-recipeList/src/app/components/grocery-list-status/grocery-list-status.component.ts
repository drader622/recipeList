import { Component, OnInit } from '@angular/core';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-grocery-list-status',
  templateUrl: './grocery-list-status.component.html',
  styleUrl: './grocery-list-status.component.css',
})
export class GroceryListStatusComponent implements OnInit {
  totalQuantity: number = 0;

  constructor(
    private groceryListService: GroceryListService

  ) {}

  ngOnInit(): void {
    this.updateGroceryListStatus();
  }
  updateGroceryListStatus() {
    this.groceryListService.getMealList().subscribe((data) => {
      this.totalQuantity = data.length;
    })
  }
}
