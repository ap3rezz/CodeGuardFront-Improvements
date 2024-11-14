import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "http://localhost:8080/code-guard"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  //Corregir el servicio para que los errores los maneje mejor

  constructor(private httpClient: HttpClient) {}

  registerUser(userPost:any):Observable<any>{
    return this.httpClient.post(this.apiURL + '/register', JSON.stringify(userPost), this.httpOptions)
    //.pipe(catchError(this.errorHandler))
  }

  /*
  errorHandler(error:any){
    let errormsg = "";
    if(error.error instanceof ErrorEvent){
      errormsg = error.error.message;
    }else{
      errormsg =  `Error Code : ${error.status}\n Message: ${error.message}`
    }
    return throwError(errormsg);
  }
  */
}
