import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseResponse } from '../model/exercise-response';
import { CreateExerciseRequest } from '../model/create-exercise-request';
import { environment } from '../environment';
import { SolutionObjResponse } from '../model/solution-obj-response';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = `${environment.apiUrl}/exercise`;

  constructor(private http: HttpClient) { }

  getProblems(): Observable<ExerciseResponse[]> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.get<ExerciseResponse[]>(`${this.apiUrl}/allExercises`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  getProblem(exerciseId:string): Observable<ExerciseResponse> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.get<ExerciseResponse>(`${this.apiUrl}/${exerciseId}`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  getSolutions(exerciseId: string): Observable<SolutionObjResponse[]> {
    let token: string = localStorage.getItem('JWT') || "";
    return this.http.get<SolutionObjResponse[]>(`${this.apiUrl}/${exerciseId}/allSolutions`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  getSolution(userId:string ,exerciseId: string): Observable<SolutionObjResponse> {
    let token: string = localStorage.getItem('JWT') || "";
    return this.http.get<SolutionObjResponse>(`${this.apiUrl}/${exerciseId}/${userId}`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }


  postProblem(createexerciserequest:CreateExerciseRequest): Observable<ExerciseResponse> {
    let token: string = localStorage.getItem('JWT') || "";

    return this.http.post<ExerciseResponse>(`${this.apiUrl}/createExercise`, createexerciserequest,{ headers: new HttpHeaders({ 'Authorization': token }) });  
  }
}
