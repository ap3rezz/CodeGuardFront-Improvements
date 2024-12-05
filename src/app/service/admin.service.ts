import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminPrivilegesRequest } from '../model/admin-privileges-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = "http://localhost:8080/code-guard/admin/";

  constructor(private http: HttpClient) { }

  postSolution(adminprivilegesrequest: AdminPrivilegesRequest): Observable<any> {
    let token: string = sessionStorage.getItem('JWT') || "";
    return this.http.patch<Observable<any>>(this.apiUrl+"updateUserPrivileges", adminprivilegesrequest,{ headers: new HttpHeaders({ 'Authorization': token }) });
  }
}
