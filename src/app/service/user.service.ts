import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequest } from '../model/signup-request';
import { LoginResponse } from '../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "http://localhost:8080/code-guard"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  httpOptionsLogin = {
    headers: new HttpHeaders({'Content-Type':'application/json',
      //TODO: Meter aqui la cabecera de authentification
    })
  }

  constructor(private httpClient: HttpClient) {}

  registerUser(SignupRequest:SignupRequest):Observable<any>{
    return this.httpClient.post(this.apiURL + '/register', JSON.stringify(SignupRequest), this.httpOptions)
  }

  loginUser(loginRequest:SignupRequest):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.apiURL + '/login', JSON.stringify(loginRequest)); //TODO: acabar esta request
  }

}
