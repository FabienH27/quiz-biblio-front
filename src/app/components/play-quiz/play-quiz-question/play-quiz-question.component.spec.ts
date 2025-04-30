import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizQuestionComponent } from './play-quiz-question.component';
import { Question } from '../../../types/quiz';
import { ImageService } from '../../../services/image.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('PlayQuizQuestionComponent', () => {
  let component: PlayQuizQuestionComponent;
  let fixture: ComponentFixture<PlayQuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayQuizQuestionComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ImageService,
        provideFirebaseApp(() => initializeApp({ storageBucket: 'TESTING_BUCKET' })),
        provideStorage(() => getStorage()),
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
