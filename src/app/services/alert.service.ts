import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  displayState = false;

  doSomething(){
    this.displayState = true;
  }

  getState(){
    return this.displayState;
  }

}
