import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEditionComponent } from './quiz-edition.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { QuizService } from '../../../services/quiz.service';
import { AlertService } from '../../../services/alert.service';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('QuizEditionComponent', () => {
  let component: QuizEditionComponent;
  let fixture: ComponentFixture<QuizEditionComponent>;

  const quizSubject = new BehaviorSubject({
    quiz: {
      id: 'a',
      imageId: null,
      creator: null,
      questions: [],
      themes: ['Movie'],
      title: 'Quiz title'
    }
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizEditionComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        QuizService,
        AlertService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: quizSubject.asObservable()
          }
        },
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
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuizEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
