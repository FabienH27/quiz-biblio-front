import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListItemComponent } from './quiz-list-item.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app.config';
import { QuizInfo } from '../../types/quiz-info';

describe('QuizListItemComponent', () => {
  let component: QuizListItemComponent;
  let fixture: ComponentFixture<QuizListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizListItemComponent],
      providers: [
        appConfig.providers,
        provideHttpClientTesting()
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
