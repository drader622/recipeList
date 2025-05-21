import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // subscribe to authentication state changes
    
    
  }
  getUserDetails() {
    if (this.isAuthenticated) {
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens
    
  }
}
