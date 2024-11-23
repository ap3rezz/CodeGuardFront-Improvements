import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../service/exercise.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-exercisepage',
  standalone: true,
  imports: [FormsModule], // Añade FormsModule aquí
  templateUrl: './exercisepage.component.html',
  styleUrls: ['./exercisepage.component.css']
})
export class ExercisePageComponent implements OnInit {
  problemtitle: string = "";
  problemdescription: string = "";
  stackTrace: string = "";
  userCode: string = "";

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.exerciseService.getProblem(id).subscribe({
        next: (data) => {
          this.problemtitle = data.title;
          this.problemdescription = data.description;
          console.log('Datos del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener el problema:', error);
        }
      });
    }
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('JWT');
    if (id && token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const body = {
        problemId: id,
        solution: this.userCode
      };
      this.http.post('/compiler/compile', body, { headers }).subscribe({
        next: (response: any) => {
          if (response.errors) {
            this.stackTrace = response.errors;
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Error al compilar el código:', error);
        }
      });
    }
  }
}
