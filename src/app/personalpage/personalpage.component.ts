import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { UserResponse } from '../model/user-response';

@Component({
  selector: 'app-personalpage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './personalpage.component.html',
  styleUrl: './personalpage.component.css'
})
export class PersonalpageComponent implements OnInit {
  user: UserResponse = {
    username: '',
    tester: false,
    creator: false
  };
  
  constructor(private userservice: UserService) {}
  
    deleteThisUser():void{
    this.userservice.deleteLoggedUser().subscribe({
      next: (response) => {
        localStorage.clear;
        console.log("Deleted user :", response);
      },
      error: (error)=>{
        console.error("Can't delete the user: ", error);
      }
    })
  }
  
  ngOnInit(): void {

    const loggedUsername = localStorage.getItem('loggedUsername');
    if(loggedUsername){
      this.userservice.getUser(loggedUsername).subscribe({
        next: (data) => {
          this.user.username = data.username;
          this.user.tester = data.tester;
          this.user.creator = data.creator;
          console.log('Datos de usuario:', data);
        },
        error: (error) => {
          console.error('Error buscar el usuario:', error);
        },
      });
    }
    else{
      console.error('No se encontró el nombre de usuario en el localstorage');
    }

  }
}
