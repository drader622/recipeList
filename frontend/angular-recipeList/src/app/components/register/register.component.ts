import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../common/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private loginService: LoginService) {}

  request: User = new User();
  msg: string | undefined;

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

    this.loginService.register(this.request).subscribe();

    // if (this.signupForm.valid) {
    //   console.log('Form is valid');

    //   this.loginService.register(this.request).subscribe({
    //     next: (res) => {
    //       console.log(res.email);

    //       this.msg = res.email;
    //     },
    //     error: (err) => {
    //       console.log('Error Received:', err);
    //     },
    //   });
    // } else {
    //   console.log('On submit failed.');
    // }
  }
}
