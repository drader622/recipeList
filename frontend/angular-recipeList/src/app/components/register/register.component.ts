import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../common/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  request: User = new User();

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public onSubmit() {
    const formValue = this.signupForm.value;

    this.request.email = formValue.email;
    this.request.username = formValue.username;
    this.request.password = formValue.password;

    this.loginService.register(this.request).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
