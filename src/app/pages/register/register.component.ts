import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterForm } from '../../types/register-form';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, NgClass, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  authService = inject(AuthService);
  router = inject(Router);

  protected registerForm = new FormGroup<RegisterForm>({
    username: new FormControl('', {nonNullable: true, validators:[Validators.required, Validators.minLength(3), Validators.maxLength(20)]}),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators:[Validators.required] }),
  });

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get isUsernameInvalid(){
    return this.username?.invalid && (this.username?.dirty || this.username?.touched);
  }

  get isEmailInvalid(){
    return this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }

  get isPasswordInvalid(){
    return this.password?.invalid && (this.password?.dirty || this.password?.touched);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe();
      this.router.navigate(['/login']);
    }
  }

}
