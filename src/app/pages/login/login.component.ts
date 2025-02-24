import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  alertService = inject(AlertService);
  
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit() {
    const fieldsValid = !!this.email?.value && !!this.password?.value;

    if(this.loginForm.valid && fieldsValid){
      this.authService.login({ email: this.email.value, password: this.password.value}).subscribe({
          next: () => {
            const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
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
