import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionsService } from '../service/solutions.service';
import { CommonModule } from '@angular/common';
import { SolutionsResponse } from '../model/solutions-response';

@Component({
  selector: 'app-exercisepagesolutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercisepagesolutions.component.html',
  styleUrls: ['./exercisepagesolutions.component.css']
})
export class ExercisePageSolutionsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private solutionService: SolutionsService) {}

  problems: SolutionsResponse = {
    exercise_id: "",
    solutions: {},
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.solutionService.getSolutions(id).subscribe({
        next: (data) => {
          this.problems = data;
          console.log('Soluciones del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener las soluciones del problema:', error);
        }
      });
    }
  }
}


