import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(QuizService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
