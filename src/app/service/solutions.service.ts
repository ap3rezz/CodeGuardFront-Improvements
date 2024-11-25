import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SolutionObjResponse } from '../model/solution-obj-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {

  private apiUrl = 'http://localhost:8080/code-guard/exercise';

  constructor(private http: HttpClient) { }

  getSolutions(exerciseId: string): Observable<SolutionObjResponse[]> {
    let token: string = localStorage.getItem('JWT') || "";
    return this.http.get<SolutionObjResponse[]>(`${this.apiUrl}/${exerciseId}/allSolutions`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }
  getSolution(userId:string ,exerciseId: string): Observable<SolutionObjResponse> {
    let token: string = localStorage.getItem('JWT') || "";
    return this.http.get<SolutionObjResponse>(`${this.apiUrl}/${exerciseId}/${userId}`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }
}
