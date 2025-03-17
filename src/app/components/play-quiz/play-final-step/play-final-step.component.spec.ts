import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFinalStepComponent } from './play-final-step.component';
import { appConfig } from '../../../app.config';
import { Answer } from '../../../types/answer';

describe('PlayFinalStepComponent', () => {
  let component: PlayFinalStepComponent;
  let fixture: ComponentFixture<PlayFinalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayFinalStepComponent],
      providers: [
        appConfig.providers,
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
    answers.set('test', {isCorrect: true, value: [1]});

    fixture.componentRef.setInput('quiz', quiz);
    fixture.componentRef.setInput('answers', answers);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
