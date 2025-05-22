import { Component, OnDestroy, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginService } from '../../services/login/login.service';
import { RefreshService } from '../../services/refreshService/refresh.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

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
            this.getUserDetails();
          }
        });
      });
  }
  getUserDetails() {
    if (this.isAuthenticated) {
      this.loginService.getUserInfo().subscribe((data) => {
        this.username = data.username;
      });
    }
  }

  logout() {
    this.loginService.logout().subscribe((data) => {
      this.refreshService.triggerRefresh();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
