import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreationQuestionComponent } from './creation-question.component';

describe('QuizCreationQuestionComponent', () => {
  let component: QuizCreationQuestionComponent;
  let fixture: ComponentFixture<QuizCreationQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreationQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizCreationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
