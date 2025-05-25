import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-recipeList';

  constructor(private router: Router) {
        this.router.events
          .pipe(
            filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd)
          )
          .subscribe((event) => {
            if (event.id === 1 && event.url === event.urlAfterRedirects) {
              // Your code here for when the page is refreshd
              router.navigateByUrl("/");
            }
          });
  }


}
