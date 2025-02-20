import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizQuestionComponent } from './play-quiz-question.component';

describe('PlayQuizQuestionComponent', () => {
  let component: PlayQuizQuestionComponent;
  let fixture: ComponentFixture<PlayQuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayQuizQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayQuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
