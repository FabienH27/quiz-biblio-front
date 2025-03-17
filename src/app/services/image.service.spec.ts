import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../app.config';

describe('ImageService', () => {
  let service: ImageService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        appConfig.providers,
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ImageService);
    
    const httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
