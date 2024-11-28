import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../model/user-request';
import { UserInfo } from '../model/user-info';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = environment.apiUrl;

  private httpOptionsJson = {
    headers: new HttpHeaders({'Content-Type':'application/json'}),
  }

  constructor(private httpClient: HttpClient) { }

  //TODO: mirar si alguna de estas solicitudes que reciben "any" requiere un model para almacenar la respuesta
  registerUser(signupRequest:UserRequest):Observable<any>{
    return this.httpClient.post(`${this.apiURL}/register`, JSON.stringify(signupRequest), this.httpOptionsJson)
  }

  loginUser(loginRequest:UserRequest):Observable<any>{
    //Observe 'response' sirve para que en vez de recibir el cuerpo de la petición recibe toda la respuesta para extraer datos de la cabecera
    return this.httpClient.post<any>(`${this.apiURL}/login`, JSON.stringify(loginRequest), {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'});
  }

  getUser(username:string):Observable<UserInfo>{
    let token:string = localStorage.getItem('JWT')||"";
    return this.httpClient.get<UserInfo>(`${this.apiURL}/user/${username}`, {headers: new HttpHeaders({'Authorization':token})});
  }

  deleteLoggedUser():Observable<any>{
    let token: string = localStorage.getItem('JWT') || "";
    return this.httpClient.delete(`${this.apiURL}/user/delete`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  deleteUser(username: string): Observable<any> {
    let token: string = localStorage.getItem('JWT') || "";
    return this.httpClient.delete(`${this.apiURL}/admin/delete?username=` + username, { headers: new HttpHeaders({ 'Authorization': token }) });
  }
  

}
