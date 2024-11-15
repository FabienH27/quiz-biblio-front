import { Injectable } from '@angular/core';
import { AlertLevel } from '../types/alert-levels';
import { Subject } from 'rxjs';
import { AlertInfo } from '../types/alert-info';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private alertSubject = new Subject<AlertInfo>();
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string, level: AlertLevel = "info"){
    this.alertSubject.next({level, message});
  }

}
