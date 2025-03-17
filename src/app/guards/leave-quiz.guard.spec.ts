import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { leaveQuizGuard } from './leave-quiz.guard';
import { PlayQuizComponent } from '../pages/play-quiz/play-quiz.component';

describe('leaveQuizGuard', () => {
  const executeGuard: CanDeactivateFn<PlayQuizComponent> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => leaveQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
