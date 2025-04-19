import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizComponent } from './play-quiz.component';
import { appConfig } from '../../app.config';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('PlayQuizComponent', () => {
  let component: PlayQuizComponent;
  let fixture: ComponentFixture<PlayQuizComponent>;

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
      imports: [PlayQuizComponent],
      providers: [
        appConfig.providers,
        {
          provide: ActivatedRoute,
          useValue: {
            data: quizSubject.asObservable()
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayQuizComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
