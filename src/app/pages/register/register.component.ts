import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterForm } from '../../types/register-form';
import { NgClass } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { AlertService } from '../../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, NgClass, TranslocoPipe, NgIcon],
  providers: [provideIcons({heroInformationCircle})],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);

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

  displayMessage = false;

  constructor(){
    this.displayMessage = this.router.getCurrentNavigation()?.extras.state?.['fromQuiz'] ?? false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: () => {
          const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl') || '/';
          this.router.navigate([redirectUrl]);
          this.alertService.showAlert("Successfully registered and logged in!");
        },
        error: (error: HttpErrorResponse) => {
          this.alertService.showAlert("An error occured while logging in.", 'error');
          console.error(error);
        }
      });
    }
  }

}
