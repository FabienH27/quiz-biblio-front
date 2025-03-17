import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizComponent } from './play-quiz.component';
import { appConfig } from '../../app.config';

describe('PlayQuizComponent', () => {
  let component: PlayQuizComponent;
  let fixture: ComponentFixture<PlayQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayQuizComponent],
      providers: [
        appConfig.providers
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayQuizComponent);
    component = fixture.componentInstance;

    component.quiz = {
      id: 'a',
      imageId: null,
      creator: null,
      questions: [],
      themes: ['Movie'],
      title: 'Quiz title'
    };

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
