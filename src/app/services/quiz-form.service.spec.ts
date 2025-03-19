import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuizFormService } from './quiz-form.service';

describe('QuizFormService', () => {
  let service: QuizFormService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(QuizFormService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
