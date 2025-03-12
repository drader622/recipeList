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
  ingredient!: Ingredient | null;

  ingredients: Ingredient[] = [];
  currentRecipeId: number = 1;

  constructor(
    private ingredientService: IngredientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleSearchIngredients();
    });
  }

  handleSearchIngredients() {
      console.log('test')
    const theIngredientId: number = +this.route.snapshot.paramMap.get('id')!;

    this.ingredients = [];

    // this.ingredientService.getIngredient(theIngredientId).subscribe((data) => {
    //   this.ingredient = data;
    // });

    this.ingredients =
      this.ingredientService.getIngredientList(theIngredientId);
  }

  // handleIngredientList() {
  //       const theRecipeId: number =
  //     +this.route.snapshot.paramMap.get('id')!;
  //   console.log('test')
    
  //       this.ingredientService.getIngredientList(theRecipeId);
  // }
}
