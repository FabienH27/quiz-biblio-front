import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { leaveQuizGuard } from './leave-quiz.guard';

describe('leaveQuizGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters: any[]) => 
      TestBed.runInInjectionContext(() => leaveQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
