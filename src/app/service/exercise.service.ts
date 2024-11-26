import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseResponse } from '../model/exercise-response';
import { CompilerResponse } from '../model/compiler-response';

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

  //TODO: Actualziar la peticion cuando esté el controler de crear problema echo
  postProblem(): Observable<any> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.post<any>(this.apiUrl+"",{ headers: new HttpHeaders({ 'Authorization': token }) });
  }
}
