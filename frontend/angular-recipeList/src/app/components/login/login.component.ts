import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import myAppConfig from '../../config/my-app-config';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../common/user';
import { LoginRequest } from '../../common/login-request';
import { Form } from '@okta/okta-signin-widget/types/packages/@okta/courage-dist/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authorized: boolean = false;
  currentUser: User = new User();

  constructor(private loginService: LoginService) {}

  // userForm: FormGroup | undefined;
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {

  }

  onSubmit() {
    const formValue = this.userForm.value;

    // if (formValue.username == '' || formValue.password == '') {
    //   alert('Wrong Credentilas');
    //   return;
    // }

    this.request.username = formValue.username;
    this.request.password = formValue.password;

    console.log(this.request.username, this.request.password)
    this.authenticate();
  }

  // router = inject(Router);
  request: LoginRequest = new LoginRequest();

  authenticate() {
    this.loginService.login(String(this.request.username), String(this.request.password)).subscribe((data) => {
      console.log(data);
    });
  }

  getUserInfo() {

  }
}
