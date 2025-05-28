import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormComponent } from './quiz-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

describe('QuizFormComponent', () => {
  let component: QuizFormComponent;
  let fixture: ComponentFixture<QuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFirebaseApp(() => initializeApp({ storageBucket: 'TESTING_BUCKET' })),
        provideStorage(() => getStorage()),
        provideTransloco({
          config: { 
            availableLangs: ['en', 'fr'],
            defaultLang: 'fr',
            fallbackLang: 'en',
            reRenderOnLangChange: true,
            prodMode: false,
          },
          loader: TranslocoHttpLoader
      }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
