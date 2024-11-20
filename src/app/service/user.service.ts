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
    headers: new HttpHeaders({'Content-Type':'application/json'}),
  }

  constructor(private httpClient: HttpClient) {}

  registerUser(SignupRequest:SignupRequest):Observable<any>{
    return this.httpClient.post(this.apiURL + '/register', JSON.stringify(SignupRequest), this.httpOptions)
  }

  loginUser(loginRequest:SignupRequest):Observable<any>{
    return this.httpClient.post<any>(this.apiURL + '/login', JSON.stringify(loginRequest), {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'});
  }

  //TODO: cambiar lo de abajo para que funcione con el backend cuando el backend este arreglado
  getUser(username:string):Observable<any>{
    let i:string = localStorage.getItem('JWT')||"";
    return this.httpClient.get(`${this.apiURL}/user/${username}`, {headers: new HttpHeaders({'Authorization':i})});
  }

  /*
  deleteUserByUsername(username:string):Observable<any>{
    return this.httpClient.post(`${this.apiURL}admin/delete`, username, 
    {headers: this.createAuthorizationHeader()});
  }
  */

  //TODO: cuando se necesite el token para realizar una solicitud se pone este metodo como tercer campo de la solicitud (por ahora no se usa)
  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
      headers.set('Content-Type','application/json');
      return headers;
    } else {
      console.log("JWT token not found in the Local Storage");
    }
    return null;
  }

}
