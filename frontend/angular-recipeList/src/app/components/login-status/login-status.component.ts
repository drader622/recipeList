import { Component, OnDestroy, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginService } from '../../services/login/login.service';
import { RefreshService } from '../../services/refreshService/refresh.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit, OnDestroy {
  isAuthenticated: Boolean = false;
  username: string | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private loginService: LoginService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    this.refreshService.refreshObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // subscribe to authentication state changes
        this.loginService.getAuthState().subscribe((response) => {
          this.isAuthenticated = response;
          if (this.isAuthenticated) {
            console.log('user is authenticated');
            this.getUserDetails();
          } else {
            console.log('no user');
          }
        });
      });
  }
  getUserDetails() {
    if (this.isAuthenticated) {
      this.loginService.getUser().subscribe((data) => {
        this.username = data.username;
      });
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
