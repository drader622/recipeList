import { Ingredient } from "./ingredient";

export class GroceryListItem {
    id: number;
    name: string;
    amount: number;
    unit: string;


    constructor(ingredient: Ingredient) {
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.amount = ingredient.amount;
        this.unit = ingredient.unit;
    }
}
