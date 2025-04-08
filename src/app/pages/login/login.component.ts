import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../types/login-form';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, TranslocoPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);

  protected loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const fieldsValid = !!this.email?.value && !!this.password?.value;

    if (this.loginForm.valid && fieldsValid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl') || '/';
          this.router.navigate([redirectUrl]);
          this.alertService.showAlert("Successfully logged in!");
        },
        error: (error: HttpErrorResponse) => {
          this.alertService.showAlert("An error occured while logging in.", 'error');
          console.error(error);
        }
      });
    }
  }
}
