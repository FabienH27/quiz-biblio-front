import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuestionHostComponent } from './specs/question-host.component';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';

describe('QuestionFormComponent', () => {
  let fixture: ComponentFixture<QuestionHostComponent>;
  let hostComponent: QuestionHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionHostComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFirebaseApp(() => initializeApp({ storageBucket: 'TESTING_BUCKET' })),
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
        provideStorage(() => getStorage()),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });
});
