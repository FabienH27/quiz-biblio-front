import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizQuestionComponent } from './play-quiz-question.component';
import { appConfig } from '../../../app.config';
import { Question } from '../../../types/quiz';

describe('PlayQuizQuestionComponent', () => {
  let component: PlayQuizQuestionComponent;
  let fixture: ComponentFixture<PlayQuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayQuizQuestionComponent],
      providers: [
        appConfig.providers
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayQuizQuestionComponent);
    component = fixture.componentInstance;

    const question : Question = {
      correctProposalIds: [1],
      details: 'details about the question',
      imageId: 'abc',
      proposals: [
        {
          text: 'A'
        },
        {
          text: 'B'
        }
      ],
      text: 'question ?'
    }

    fixture.componentRef.setInput('question', question);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
