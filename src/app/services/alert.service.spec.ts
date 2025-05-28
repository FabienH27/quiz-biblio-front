import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger default alert level', (done) => {
    service.alert$.subscribe(alert => {
      expect(alert).toEqual({ level: 'info', message: 'test' });
      done();
    });
    
    service.showAlert('test');
  });

  it('should trigger error alert level', (done) => {
    service.alert$.subscribe(alert => {
      expect(alert).toEqual({ level: 'error', message: 'test' });
      done();
    });
    
    service.showAlert('test', 'error');
  });

});
