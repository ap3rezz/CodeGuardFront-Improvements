import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolutionsService } from '../service/solutions.service';
import { CommonModule } from '@angular/common';
import { SolutionsResponse } from '../model/solutions-response';
import { ExerciseService } from '../service/exercise.service';

@Component({
  selector: 'app-exercisepagesolutions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exercisepagesolutions.component.html',
  styleUrls: ['./exercisepagesolutions.component.css']
})
export class ExercisePageSolutionsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private solutionService: SolutionsService, private exerciseService: ExerciseService) {}

  problems: SolutionsResponse = {
    solutions: {},
  };
  id:string="";
  title:string="";

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = routeId;
      this.solutionService.getSolutions(routeId).subscribe({
        next: (data) => {
          this.problems = data;
          console.log('Soluciones del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener las soluciones del problema:', error);
        }
      });
      this.exerciseService.getProblem(routeId).subscribe({
        next: (data)=>{
          this.title = data.title;
          console.log('Datos del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener los datos del problema:', error);
        }
      });
    }

  }
}


