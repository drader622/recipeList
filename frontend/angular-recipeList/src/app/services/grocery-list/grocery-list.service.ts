import { Injectable } from '@angular/core';
import { GroceryListItem } from '../../common/grocery-list-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  groceryListItems: GroceryListItem[] = [];

  totalQuantity: Subject<number> = new Subject<number>()
  constructor() { }

  addToList(theGroceryListItem: GroceryListItem) {
    let alreadyExistsInList: boolean = false;
    let existingListItem: GroceryListItem = undefined!;

    if (this.groceryListItems.length > 0) {
      // find the item in the cart based on item id
      existingListItem = this.groceryListItems.find(
        (tempGroceryItem) => tempGroceryItem.id === theGroceryListItem.id
      )!;

      // check if we found it
      alreadyExistsInList = existingListItem != undefined;
    }

    // convert to ounces
    console.log(theGroceryListItem.unit)
    if (theGroceryListItem.unit != 'oz' && theGroceryListItem.unit != 'units' && theGroceryListItem.unit != 'fl. oz') {
      theGroceryListItem.amount = convertUnit(theGroceryListItem.unit, theGroceryListItem.amount);
    }

    if (alreadyExistsInList) {
      // increment the quantity
      existingListItem.amount += theGroceryListItem.amount;
    } else {
      // just add the item to the array
      this.groceryListItems.push(theGroceryListItem);
      this.groceryListItems.forEach((item) =>
        console.log(`Item: ${item.name}`)
      );
    }

    // compute cart total price and total quantity
    this.computeListTotal();
  }

  computeListTotal() {
    let totalQuantityValue: number = 0;

    for (let currentGroceryListItem of this.groceryListItems) {
      totalQuantityValue += currentGroceryListItem.amount;
    }

    // publish the new values .. all subscribers will receive the new data
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purposes
    this.logGroceryListData(totalQuantityValue);
  }
  logGroceryListData(totalQuantityValue: number) {
    console.log(`Contents of the cart`);
    for (let tempGroceryItem of this.groceryListItems) {
      console.log(`name: ${tempGroceryItem.name}, amount: ${tempGroceryItem.amount} oz`)
    }

    console.log(`totalQuantity: ${totalQuantityValue}`);
    console.log(`---`);
  }

}

function convertUnit(unit: String, amount: number) {
  switch (unit) {
    case 'cup': return amount * 8
      break;
    case 'Tbsp.': return amount * 0.5
      break;
    case 'tsp': return amount * 0.1666667
      break;
    default: return amount;
      break;
  }
}

