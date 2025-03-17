import { TestBed } from '@angular/core/testing';

import { FireStorageService } from './fire-storage.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../app.config';

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
    
    const httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
