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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authorized: boolean = false;
  currentUser: User = new User();

  constructor(private loginService: LoginService) {}

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {
    // this.login();
  }

  // router = inject(Router);
  // request: LoginRequest = new LoginRequest();

  login() {
    this.loginService.login("user1", "P4ssword").subscribe((data) => {
      console.log(data.response);
    });
    // this.storage.remove('auth-key');

    // const formValue = this.userForm.value;

    // if (formValue.username == '' || formValue.password == '') {
    //   alert('Wrong Credentilas');
    //   return;
    // }

    // this.request.username = formValue.username;
    // this.request.password = formValue.password;

    // this.integration.doLogin(this.request).subscribe({
    //   next: (res) => {
    //     console.log('Received Response:' + res.token);

    //     this.storage.set('auth-key', res.token);

    //     this.integration.dashboard().subscribe({
    //       next: (dashboardres) => {
    //         console.log('Dashboard res:' + dashboardres.response);

    //         this.router.navigateByUrl('dashboard');
    //       },
    //       error: (err) => {
    //         console.log('Dashboard error received :' + err);
    //         this.storage.remove('auth-key');
    //       },
    //     });
    //   },
    //   error: (err) => {
    //     console.log('Error Received Response:' + err);
    //     this.storage.remove('auth-key');
    //   },
    // });
  }

  isAuthenticated() {
    
  }
}
