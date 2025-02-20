import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { playQuizGuard } from './play-quiz.guard';

describe('playQuizGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => playQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
