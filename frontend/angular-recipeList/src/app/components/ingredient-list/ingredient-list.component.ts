import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../common/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements OnInit {
  ingredient!: Ingredient;
  // searchMode: boolean = false;

  constructor(
    private ingredientService: IngredientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleSearchIngredients();
    });
  }


  handleSearchIngredients() {
    const theIngredientId: number = +this.route.snapshot.paramMap.get('id')!;

    this.ingredientService.getIngredient(theIngredientId).subscribe((data) => {
      this.ingredient = data;
    })
  }
  
}
