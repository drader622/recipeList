import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './services/recipe.service';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'category/:id', component: RecipeListComponent },
  { path: 'category', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '**', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, RecipeListComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
