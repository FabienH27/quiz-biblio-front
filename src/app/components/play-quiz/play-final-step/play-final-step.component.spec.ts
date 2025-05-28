import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFinalStepComponent } from './play-final-step.component';
import { Answer } from '../../../types/answer';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PlayFinalStepComponent', () => {
  let component: PlayFinalStepComponent;
  let fixture: ComponentFixture<PlayFinalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayFinalStepComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
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
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayFinalStepComponent);
    component = fixture.componentInstance;

    const quiz = {
      id: 'a',
      imageId: null,
      creator: null,
      questions: [],
      themes: ['Movie'],
      title: 'Quiz title'
    };

    const answers = new Map<string, Answer>();
    answers.set('test', { isCorrect: true, value: [1] });

    fixture.componentRef.setInput('quiz', quiz);
    fixture.componentRef.setInput('answers', answers);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
