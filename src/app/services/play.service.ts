import { Injectable } from '@angular/core';
import { uniqueNamesGenerator, adjectives, animals, Config } from 'unique-names-generator';


@Injectable({
  providedIn: 'root'
})
export class PlayService {

  storageKey = 'userName';

  randomNameConfig: Config = {
    dictionaries: [adjectives, animals, ],
    separator: '-',
    length: 2,
  };

  private _userScore = 0;

  public set userScore(v : number) {
    this._userScore = v;
  }

  public get userScore() : number {
    return this._userScore;
  }
  

  saveUserToStorage(userName: string){
    //prevents empty user name
    if(localStorage.getItem(this.storageKey) === null){
      userName = this.getRandomUserName();
    }

    localStorage.setItem(this.storageKey, userName);
  }

  getUserName(){
    return localStorage.getItem(this.storageKey);
  }

  getRandomUserName(){
    const randomName: string = uniqueNamesGenerator(this.randomNameConfig);
    
    this.saveUserToStorage(randomName);

    return randomName;
  }

}
