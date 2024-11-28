import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../model/user-info';
import { ExerciseService } from '../service/exercise.service';
import { ExerciseResponse } from '../model/exercise-response';
import { ChangePasswordResponse } from '../model/change-passwords-response';

@Component({
  selector: 'app-personalpage',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
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
    private exerciseservice: ExerciseService,
    private fb: FormBuilder,
  ) {}

  passwords = this.fb.group({
    oldpassword: ['', Validators.required],
    newpassword: ['',Validators.required],
  });

  passwordsresponse: ChangePasswordResponse = {
    oldPassword:"",
    newPassword:"",
  };


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
    }
  }

  onSubmit():void{
    if (this.passwords.valid && this.passwords.value.oldpassword && this.passwords.value.newpassword){
      this.passwordsresponse.oldPassword = this.passwords.value.oldpassword;
      this.passwordsresponse.newPassword = this.passwords.value.newpassword;
      this.userservice.updatePassword(this.passwordsresponse).subscribe({
        next: (data) => {
          console.log("Datos del usuario: ", data);
        },
        error: (error) => {
          console.error("El usuario no existe: ", error); 
        }
      });
    }
  }
}
