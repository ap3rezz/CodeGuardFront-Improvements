import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../service/exercise.service';
import { ExerciseResponse } from '../model/exercise-response';

@Component({
  selector: 'app-exercisepage',
  standalone: true,
  imports: [],
  templateUrl: './exercisepage.component.html',
  styleUrls: ['./exercisepage.component.css']
})
export class ExercisePageComponent implements OnInit {
  problem: ExerciseResponse | undefined;

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.exerciseService.getProblem(id).subscribe({
        next: (data) => {
          this.problem = data;
          console.log('Datos del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener el problema:', error);
        }
      });
    }
  }
}
