import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseResponse } from '../model/exercise-response';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = `${environment.apiUrl}/exercise/`;

  constructor(private http: HttpClient) { }

  getProblems(): Observable<ExerciseResponse[]> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.get<ExerciseResponse[]>(this.apiUrl+"allExercises", { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  getProblem(exerciseId:string): Observable<ExerciseResponse> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.get<ExerciseResponse>(this.apiUrl+exerciseId, { headers: new HttpHeaders({ 'Authorization': token }) });
  }
}
