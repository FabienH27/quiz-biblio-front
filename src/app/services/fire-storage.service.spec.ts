import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FireStorageService } from './fire-storage.service';
import { provideHttpClient } from '@angular/common/http';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

describe('FireStorageService', () => {
  let service: FireStorageService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFirebaseApp(() => initializeApp({ storageBucket: 'TESTING_BUCKET' })),
        provideStorage(() => getStorage()),
      ]
    });
    service = TestBed.inject(FireStorageService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
