import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolutionsResponse } from '../model/solutions-response';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {

  private apiUrl = 'http://localhost:8080/code-guard/exercises';

  constructor(private http: HttpClient) { }

  getSolutions(exerciseId: string): Observable<SolutionsResponse> {
    let token: string = localStorage.getItem('JWT') || "";
    return this.http.get<SolutionsResponse>(`${this.apiUrl}/${exerciseId}/allSolutions`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }
}
