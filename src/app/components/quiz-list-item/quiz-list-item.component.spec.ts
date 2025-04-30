import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListItemComponent } from './quiz-list-item.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuizInfo } from '../../types/quiz-info';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';

describe('QuizListItemComponent', () => {
  let component: QuizListItemComponent;
  let fixture: ComponentFixture<QuizListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizListItemComponent],
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
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({})
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizListItemComponent);
    component = fixture.componentInstance;

    const quizInfo : QuizInfo = {
      creatorName: '',
      id: 'abc',
      imageId: 'abc',
      questionCount: 1,
      themes: ['Cinema'],
      title: 'My quiz'
    };

    const targetRoute = ['/play', quizInfo.id];

    fixture.componentRef.setInput('quiz', quizInfo);
    fixture.componentRef.setInput('targetRoute', targetRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
