import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment';
import { authInterceptor } from './interceptor/auth.interceptor';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { errorInterceptor } from './interceptor/error.interceptor';
import { routes } from './app.routes';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({ storageBucket: environment.bucketName })),
    provideStorage(() => getStorage()),
    provideTransloco({
        config: { 
          availableLangs: ['en', 'fr'],
          defaultLang: 'fr',
          fallbackLang: 'en',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
    }),
    provideTranslocoPersistLang({
      storage: {
        useValue: localStorage
      }
    }),
    provideNgxSkeletonLoader()
  ],
};
