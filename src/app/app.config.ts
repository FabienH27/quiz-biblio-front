import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RbacService } from './services/rbac.service';
import { authInterceptor } from './interceptor/auth.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

function preloadRoles(rbacService: RbacService, router: Router) {
  return () => new Promise<void>((resolve, reject) => {
    rbacService.fetchRoles().subscribe({
      next: (roles) => {
        rbacService.setRoles(roles.roles);
        resolve();
      },
      error: (error) => {
        router.navigate(['/']);
        resolve();
      }
    })
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    { provide: APP_INITIALIZER, useFactory: preloadRoles, deps: [RbacService, Router], multi: true }, 
    provideFirebaseApp(() => initializeApp({storageBucket: environment.bucketName})), 
    provideStorage(() => getStorage())
  ],
};
