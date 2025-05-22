import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import myAppConfig from '../../config/my-app-config';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../common/user';
import { LoginRequest } from '../../common/login-request';
import { Form } from '@okta/okta-signin-widget/types/packages/@okta/courage-dist/types';
import { RefreshService } from '../../services/refreshService/refresh.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  currentUser: User = new User();
  request: LoginRequest = new LoginRequest();

  constructor(
    private loginService: LoginService,
    private refreshService: RefreshService
  ) {}

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {}

  onSubmit() {
    const formValue = this.userForm.value;
    this.request.username = formValue.username;
    this.request.password = formValue.password;
    this.authenticate();
  }

  router = inject(Router);

  authenticate() {
    this.loginService
      .checkForUser(String(this.request.username))
      .subscribe((userExists) => {
        if (userExists) {
          this.loginService
            .login(String(this.request.username), String(this.request.password))
            .subscribe((passwordCorrect) => {
              if (passwordCorrect && userExists) {
                this.getUserInfo();
              } else {
                alert('Wrong Credentials');
              }
            });
        } else {
          alert('Wrong Credentials');
        }
      });
  }

  getUserInfo() {
    this.loginService.getUserInfo().subscribe((data) => {
      this.router.navigateByUrl('/recipes');
      this.currentUser = data;
    });
  }

  reloadComponentB() {
    this.refreshService.triggerRefresh();
  }
}
