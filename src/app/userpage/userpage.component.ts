import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../model/user-info';
import { ExerciseService } from '../service/exercise.service';
import { ExerciseResponse } from '../model/exercise-response';
import { AdminService } from '../service/admin.service'; 
import { AdminPrivilegesRequest } from '../model/admin-privileges-request'; 
import { ErrorService } from '../service/error.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserPageComponent implements OnInit {
  user: UserInfo = {
    username: '',
    tester: false,
    creator: false,
    exercises: []
  };

  adminCheck: string = "";
  exercisenames: ExerciseResponse[] = [];

  constructor(
    private userservice: UserService,
    private router: Router,
    private authservice: AuthService,
    private exerciseservice: ExerciseService,
    private adminservice: AdminService, 
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {

    if(!localStorage.getItem("JWT")){
      this.router.navigate(['/login']);
    }

    const admin = localStorage.getItem("admin");
    const id = this.route.snapshot.paramMap.get('id');

    if (id && admin) {
      this.adminCheck = admin;
      this.userservice.getUser(id).subscribe({
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

  deleteThisUser(): void {
    this.userservice.deleteUser(this.user.username).subscribe({
      next: (response) => {
        localStorage.clear();
        console.log("Deleted user:", response);
        this.authservice.setLoggedIn(true);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error("Can't delete the user:", error);
        this.errorService.changeData({code: error.status, message: "You can't delete the user"});
        this.router.navigate(['/error']);
      }
    });
  }

  savePrivileges(): void {
    const adminPrivilegesRequest: AdminPrivilegesRequest = {
      username: this.user.username,
      tester: this.user.tester,
      creator: this.user.creator
    };

    this.adminservice.postSolution(adminPrivilegesRequest).subscribe({
      next: (response) => {
        console.log("Privileges updated:", response);
      },
      error: (error) => {
        console.error("Error updating privileges:", error);
        this.errorService.changeData({code: error.status, message: "You can't change user priviledges"});
        this.router.navigate(['/error']);
      }
    });
  }

  trackByFn(index: number, item: ExerciseResponse): number {
    return item.id;
  }
}
