import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseResponse } from '../model/exercise-response';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = "http://localhost:8080/code-guard/exercise/";

  constructor(private http: HttpClient) { }

  getProblems(): Observable<ExerciseResponse[]> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.get<ExerciseResponse[]>(this.apiUrl+"allExercise", { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  getProblem(exerciseId:string): Observable<ExerciseResponse> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.get<ExerciseResponse>(this.apiUrl+exerciseId, { headers: new HttpHeaders({ 'Authorization': token }) });
  }
}
