import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PlayService } from './play.service';
import { provideHttpClient } from '@angular/common/http';
import { mockLocalStorage } from '../specs/local-storage.mock';
import { environment } from '../../environments/environment';

describe('PlayService', () => {
  let service: PlayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PlayService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch username from local storage if it exists', () => {
      service.saveUserToStorage('testUser');

      expect(service.getOrCreateUserName()).toEqual('testUser');
  });

  it('should generate a new username if local storage is empty', () => {
    expect(localStorage.getItem('guestUsername')).toBeNull();
    expect(service.getOrCreateUserName()).not.toBeNull();
    expect(service.getOrCreateUserName().length).toBeGreaterThan(0);
  });

  it('should correctly update play status', () => {
    service.setStatus('check');

    expect(service.playState()).toEqual('check');
  });

  it('should correctly clear session', () => {
    service.setSessionStarted();

    expect(localStorage.getItem('guestSessionStarted')).not.toBeNull();

    service.clearGuestSession().subscribe();

    expect(localStorage.getItem('guestUsername')).toBeNull();
    expect(localStorage.getItem('guestSessionStarted')).toBeNull();
    expect(service.playState()).toBe('start');
    expect(service.answers()).toEqual(new Map());

    httpMock.expectOne(`${environment.apiUrl}/guest/end-session`);
  });

  afterEach(() => {
    localStorage.clear();
  });

});
