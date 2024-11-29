import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  //TODO: mejorar la implementación para actualizar toda la cabecera
  setLoggedIn(status:boolean):void{
    this.isLoggedInSource.next(status);
  }

}
