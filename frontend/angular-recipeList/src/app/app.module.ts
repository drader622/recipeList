import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './services/recipe/recipe.service';

import { Routes, RouterModule } from '@angular/router';
import { RecipeCategoryMenuComponent } from './components/recipe-category-menu/recipe-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { GroceryListStatusComponent } from './components/grocery-list-status/grocery-list-status.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { TotalIngredientListComponent } from './components/total-ingredient-list/total-ingredient-list.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { RegisterComponent } from './components/register/register.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'purchase-details', component: PurchaseDetailsComponent },
  { path: 'meal-list/:id', component: MealListComponent },
  { path: 'meal-list', component: MealListComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'search/:keyword', component: RecipeListComponent },
  { path: 'category/:id', component: RecipeListComponent },
  { path: 'category', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '**', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeCategoryMenuComponent,
    SearchComponent,
    RecipeDetailsComponent,
    IngredientListComponent,
    GroceryListStatusComponent,
    MealListComponent,
    TotalIngredientListComponent,
    PurchaseDetailsComponent,
    LoginComponent,
    LoginStatusComponent,
    RegisterComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    OktaAuthModule,
  ],
  providers: [RecipeService, { provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent],
})
export class AppModule {}
