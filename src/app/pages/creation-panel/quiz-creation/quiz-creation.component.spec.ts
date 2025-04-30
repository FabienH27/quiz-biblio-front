import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreationComponent } from './quiz-creation.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { QuizService } from '../../../services/quiz.service';
import { AlertService } from '../../../services/alert.service';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

describe('QuizCreationComponent', () => {
  let component: QuizCreationComponent;
  let fixture: ComponentFixture<QuizCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreationComponent],
      providers: [
        QuizService,
        AlertService,
        provideHttpClient(),
        provideHttpClientTesting(),
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
        provideFirebaseApp(() => initializeApp({ storageBucket: 'TESTING_BUCKET' })),
        provideStorage(() => getStorage()),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuizCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
