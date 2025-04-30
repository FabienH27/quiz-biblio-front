import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserScoreService } from './user-score.service';
import { provideHttpClient } from '@angular/common/http';

describe('UserScoreService', () => {
  let service: UserScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
