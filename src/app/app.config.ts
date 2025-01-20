import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RbacService } from './auth/rbac.service';

function preloadRoles(rbacService: RbacService) {
  return () => new Promise<void>((resolve, reject) => {
    rbacService.fetchRoles().subscribe({
      next: (roles) => {        
        rbacService.setRoles(roles.roles);
        resolve();
      },
      error: (error) => {
        console.error('failed to load roles', error);
        resolve();
      }
    })
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: APP_INITIALIZER, useFactory: preloadRoles, deps: [RbacService], multi: true}
  ],
};
