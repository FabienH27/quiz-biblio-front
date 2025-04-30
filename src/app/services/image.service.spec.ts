import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

describe('ImageService', () => {
  let service: ImageService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFirebaseApp(() => initializeApp({ storageBucket: 'TESTING_BUCKET' })),
        provideStorage(() => getStorage()),
      ]
    });
    service = TestBed.inject(ImageService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
