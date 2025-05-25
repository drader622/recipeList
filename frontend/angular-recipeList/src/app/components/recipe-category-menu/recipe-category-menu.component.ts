import { Component } from '@angular/core';
import { RecipeCategory } from '../../common/recipe-category';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-category-menu',
  templateUrl: './recipe-category-menu.component.html',
  styleUrl: './recipe-category-menu.component.css',
})
export class RecipeCategoryMenuComponent {
  recipeCategories: RecipeCategory[] = [];
  thePageNumber: number = 1;
  thePageSize: number = 5;

  constructor(private recipeServices: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.listRecipeCategories();
  }

  //lists the recipe categories on the navbar
  listRecipeCategories() {
    this.recipeServices.getRecipeCategories().subscribe((data) => {
      this.recipeCategories = data;
    });
  }

  loadCategory(id: number) {
    this.recipeServices.getRecipeListPaginate(1, 5, 2).subscribe(data => console.log(data));
    // console.log(this.route)
    // this.router.navigateByUrl(`/category/${id}`)
  }
}
