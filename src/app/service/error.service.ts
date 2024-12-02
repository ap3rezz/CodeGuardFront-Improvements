import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessage } from '../model/error-message';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private dataSource = new BehaviorSubject<ErrorMessage>({code: 404, message: "Oops The page you are looking for was not found"});
  currentData = this.dataSource.asObservable();

  changeData(data: ErrorMessage) {
    this.dataSource.next(data);
  }
}
