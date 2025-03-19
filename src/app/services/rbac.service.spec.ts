import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RbacService } from './rbac.service';

describe('RbacService', () => {
  let service: RbacService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(RbacService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
