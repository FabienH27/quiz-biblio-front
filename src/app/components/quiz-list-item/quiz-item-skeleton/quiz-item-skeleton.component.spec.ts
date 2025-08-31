import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizItemSkeletonComponent } from './quiz-item-skeleton.component';

describe('QuizItemSkeletonComponent', () => {
  let component: QuizItemSkeletonComponent;
  let fixture: ComponentFixture<QuizItemSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizItemSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizItemSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
