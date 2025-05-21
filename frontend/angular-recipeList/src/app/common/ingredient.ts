export class Ingredient {
  constructor(
    public id: number,
    public recipeId: number,
    public name: string,
    public amount: number,
    public unit: string
  ) {}
}
