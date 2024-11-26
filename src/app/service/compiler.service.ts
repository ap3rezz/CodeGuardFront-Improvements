import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompilerResponse } from '../model/compiler-response';
import { Observable } from 'rxjs';
import { CompilerRequest } from '../model/compiler-request';
import { CompilerTestRequest } from '../model/compiler-test-request';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {
  private apiUrl = "http://localhost:8080/code-guard/compiler/";

  constructor(private http: HttpClient) { }

  postSolution(compilerRequest:CompilerRequest): Observable<CompilerResponse> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.post<CompilerResponse>(this.apiUrl+"compile", compilerRequest,{ headers: new HttpHeaders({ 'Authorization': token }) });
  }
  postTest(compilerRequest:CompilerTestRequest): Observable<CompilerResponse> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.post<CompilerResponse>(this.apiUrl+"test", compilerRequest,{ headers: new HttpHeaders({ 'Authorization': token }) });
  }
}

