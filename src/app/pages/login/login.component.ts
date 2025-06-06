import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../types/login-form';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, TranslocoPipe, NgIcon],
  providers: [provideIcons({heroInformationCircle})],
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

  displayMessage = false;

  constructor(){
    this.displayMessage = this.router.getCurrentNavigation()?.extras.state?.['fromQuiz'] ?? false;
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
          if(error.status === HttpStatusCode.Unauthorized){
            this.alertService.showAlert("Invalid email or password.", 'error');
          }else{
            this.alertService.showAlert("An error occured while logging in.", 'error');
          }
        }
      });
    }
  }
}
