import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../service/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit{

  constructor(private errorService: ErrorService){}

  statusCode : Number = 404;
  responseMessage :string = 'Oops The page you are looking for was not found';

  ngOnInit(): void {
    this.errorService.currentData.subscribe(
      data=>{this.statusCode = data.code;
        this.responseMessage = data.message;
      }
    )
  }
  
}
