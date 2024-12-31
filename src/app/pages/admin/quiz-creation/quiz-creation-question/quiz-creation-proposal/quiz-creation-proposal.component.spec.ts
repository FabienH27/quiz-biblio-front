import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreationProposalComponent } from './quiz-creation-proposal.component';

describe('QuizCreationProposalComponent', () => {
  let component: QuizCreationProposalComponent;
  let fixture: ComponentFixture<QuizCreationProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreationProposalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizCreationProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
