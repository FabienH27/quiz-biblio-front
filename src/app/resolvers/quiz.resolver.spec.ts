import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quizResolver } from './quiz.resolver';
import { Quiz } from '../types/quiz';

describe('quizResolver', () => {
  const executeResolver: ResolveFn<Quiz> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => quizResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
