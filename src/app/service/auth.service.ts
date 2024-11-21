import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  //TODO: hacer que el setLoggedIn sirva para mostrar todo en el header en vez de solo la lista
  setLoggedIn(status:boolean):void{
    this.isLoggedInSource.next(status);
  }

}
