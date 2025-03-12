export class MealListItem {
    constructor(
        public id: number,
        public recipeId: number,
        public name: string,
        public quantity: number,
    ) {}
}