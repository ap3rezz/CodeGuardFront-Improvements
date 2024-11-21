import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';

import { Router} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserResponse } from '../model/user-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personalpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './personalpage.component.html',
  styleUrl: './personalpage.component.css'
})
export class PersonalpageComponent implements OnInit {
  user: UserResponse = {
    username: '',
    tester: false,
    creator: false,
    problems:[]
  };
  
  constructor(private userservice: UserService, private router: Router, private authservice: AuthService) {}
  
    deleteThisUser():void{
    this.userservice.deleteLoggedUser().subscribe({
      next: (response) => {
        localStorage.clear();
        console.log("Deleted user :", response);
        //TODO: Cambiar esta cosa cutre por un setLoggedOut
        this.authservice.setLoggedIn(true);
        this.router.navigate(['/']);
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
          this.user.problems = data.problems;
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
