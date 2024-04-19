import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../common/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css',
})
export class IngredientListComponent implements OnInit {
  ingredient!: Ingredient;

  ingredients: Ingredient[] = [];
  currentRecipeId: number = 1;

  constructor(
    private ingredientService: IngredientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ingredientService: null;
    this.route.paramMap.subscribe(() => {
      this.handleSearchIngredients();
    });
  }

  handleSearchIngredients() {
    const theIngredientId: number = +this.route.snapshot.paramMap.get('id')!;

    this.ingredientService.getIngredient(theIngredientId).subscribe((data) => {
      this.ingredient = data;
    })

    this.ingredients = this.ingredientService.getIngredientList(theIngredientId);
    // console.log(this.ingredients)
  }

  handleIngredientList() {
        const theIngredientId: number =
      +this.route.snapshot.paramMap.get('id')!;
    
        this.ingredientService.getIngredientList(theIngredientId);
  }

  // ngOnInit(): void {
  //   this.listIngredients();
  // }

  // listIngredients() {
  //   this.handleListIngredients();
  // }

  // handleListIngredients() {
  //   const theRecipeId: number = +this.route.snapshot.paramMap.get('id')!;
    
  //   this.ingredientService
  //     .getIngredientList(theRecipeId)
  //     .subscribe((data) => {
  //       console.log(`The Data: ${data}`);
  //       this.ingredients = data;
  //     });
  // }
}
