import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../model/user-info';
import { ExerciseService } from '../service/exercise.service';
import { ExerciseResponse } from '../model/exercise-response';

@Component({
  selector: 'app-personalpage',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './personalpage.component.html',
  styleUrls: ['./personalpage.component.css']
})
export class PersonalpageComponent implements OnInit {
  user: UserInfo = {
    username: '',
    tester: false,
    creator: false,
    exercises: []
  };

  exercisenames: ExerciseResponse[] = [];

  constructor(
    private userservice: UserService,
    private router: Router,
    private authservice: AuthService,
    private exerciseservice: ExerciseService
  ) {}

  deleteThisUser(): void {
    this.userservice.deleteLoggedUser().subscribe({
      next: (response) => {
        localStorage.clear();
        console.log("Deleted user:", response);
        this.authservice.setLoggedIn(true);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error("Can't delete the user:", error);
        this.router.navigate(['/error']); //TODO: mandar a la pagina de error el mensaje de eror
      }
    });
  }

  ngOnInit(): void {
    const loggedUsername = localStorage.getItem('loggedUsername');
    if (loggedUsername) {
      this.userservice.getUser(loggedUsername).subscribe({
        next: (data) => {
          this.user.username = data.username;
          this.user.tester = data.tester;
          this.user.creator = data.creator;
          this.user.exercises = data.exercises;

          for (let index = 0; index < this.user.exercises.length; index++) {
            this.exerciseservice.getProblem(this.user.exercises[index]).subscribe({
              next: (data) => {
                this.exercisenames.push(data);
                console.log('Datos del problema:', data);
              },
              error: (error) => {
                console.error('Error buscar el problema:', error);
              }
            });
          }
          console.log('Datos de usuario:', data);
        },
        error: (error) => {
          console.error('Error buscar el usuario:', error);
        }
      });
    } else {
      console.error('No se encontró el nombre de usuario en el localstorage');
      this.router.navigate(['/login']);
    }
  }
}
