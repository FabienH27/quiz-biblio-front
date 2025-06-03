import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { RbacService } from './rbac.service';
import { Subject } from 'rxjs';
import { AlertInfo } from '../types/alert-info';

describe('AuthService', () => {
  let service: AuthService;
  let rbacServiceSpy: jasmine.SpyObj<RbacService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let httpMock: HttpTestingController;
  let alertSubject: Subject<AlertInfo>;

  beforeEach(() => {
    alertSubject = new Subject<AlertInfo>();

    rbacServiceSpy = jasmine.createSpyObj<RbacService>('RbacService', ['setAuthenticatedUser']);
    alertServiceSpy = jasmine.createSpyObj<AlertService>('AlertService', ['showAlert']);

    alertServiceSpy.alert$ = alertSubject.asObservable();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RbacService, useValue: rbacServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getting user information', () => {
    let req: TestRequest;

    beforeEach(() => {
      service.getUserInfo().subscribe();
      req = httpMock.expectOne(`${environment.apiUrl}/auth/user-info`);
    });

    it('should register user on successful call', () => {
      const data = {
        userName: 'test',
        userId: 'ABC',
        role: 'USER'
      };

      req.flush(data);

      expect(rbacServiceSpy.setAuthenticatedUser).toHaveBeenCalledWith(data);
      service.user$.subscribe(user => {
        expect(user).toEqual(data);
      });
    });

    it('should not do anything on unsuccessful call', () => {
      req.flush(null);

      expect(rbacServiceSpy.setAuthenticatedUser).not.toHaveBeenCalled();
      service.user$.subscribe(user => {
        expect(user).toBeNull();
      });
    });

    it('should handle errors', () => {
      req.flush(null, { status: 401, statusText: 'Unauthorized' })

      expect(rbacServiceSpy.setAuthenticatedUser).not.toHaveBeenCalled();
      service.user$.subscribe(user => {
        expect(user).toBeNull();
      });

    });
  });

  describe('checking if user is authenticated', () => {
    let req: TestRequest;

    it('should return true on successful call', () => {
      service.isAuthenticated().subscribe(result => {
        expect(result).toBeTrue();
      });

      req = httpMock.expectOne(`${environment.apiUrl}/auth/status`);
      req.flush({ authenticated: true });
    });

    it('should return false on unsuccessful call', () => {
      service.isAuthenticated().subscribe(result => {
        expect(result).toBeFalse();
      });

      req = httpMock.expectOne(`${environment.apiUrl}/auth/status`);
      req.flush(null, { status: HttpStatusCode.Unauthorized, statusText: 'Unauthorized' });
    });
  });

  describe('on logout', () => {
    let req: TestRequest;

    it('should perform logout', () => {
      alertServiceSpy.alert$.subscribe(alert => {
        expect(alert).toBe({
          level: 'warning',
          message: 'Successfulley logged out!'
        });
      });

      service.user$.subscribe(user => {
        expect(user).toBeNull();
      });

      service.logout();

      req = httpMock.expectOne(`${environment.apiUrl}/auth/logout`);
      req.flush({ message: "Logged out successfully" });


    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});