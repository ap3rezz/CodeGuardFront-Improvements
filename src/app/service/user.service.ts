import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequest } from '../model/signup-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "http://localhost:8080/code-guard"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) {}

  registerUser(SignupRequest:SignupRequest):Observable<any>{
    return this.httpClient.post(this.apiURL + '/register', JSON.stringify(SignupRequest), this.httpOptions)
  }

}
