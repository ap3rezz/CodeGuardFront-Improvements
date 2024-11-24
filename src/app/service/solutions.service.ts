import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolutionsResponse } from '../model/solutions-response';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {

  private apiUrl = 'http://localhost:8080/api/solutions';

  constructor(private http: HttpClient) { }

  getSolutions(exerciseId: string): Observable<SolutionsResponse> {
    return this.http.get<SolutionsResponse>(`${this.apiUrl}/${exerciseId}/allSolutions`);
  }
}
