import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../../environments/environment';
import { ImageResponse } from '../types/image-response';
import { FireStorageService } from './fire-storage.service';
import { of } from 'rxjs';

describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;
  
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
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return image url', () => {
    
    const imageId = 'test';
    const imageResponse: ImageResponse = {
      createdAt: new Date(),
      id: imageId,
      originalUrl: `${imageId}.jpg`,
      resizedUrl: `${imageId}_800x800.webp`
    }

    const firebaseServiceSpy = jasmine.createSpyObj<FireStorageService>('FireStorageService', ['getImage']);
    const stubUrl = `test_url/TESTING_BUCKET/o/quiz-images%${imageResponse.resizedUrl}`;

    firebaseServiceSpy.getImage.and.returnValue(of(stubUrl));
        
    service.getImageUrl(imageId).subscribe(url => {
      expect(url).toBe(stubUrl);
      
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/ImageStorage/${imageId}`);
    req.flush(imageResponse);

    // expect(firebaseServiceSpy.getImage.calls.mostRecent().returnValue).toBe(of(stubUrl));

  });

});
