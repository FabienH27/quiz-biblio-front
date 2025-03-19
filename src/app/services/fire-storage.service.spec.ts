import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../app.config';
import { FireStorageService } from './fire-storage.service';

describe('FireStorageService', () => {
  let service: FireStorageService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        appConfig.providers,
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FireStorageService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
