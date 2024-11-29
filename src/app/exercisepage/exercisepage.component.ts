import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciseService } from '../service/exercise.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExerciseResponse } from '../model/exercise-response';
import { SolutionsService } from '../service/solutions.service';
import { CompilerRequest } from '../model/compiler-request';
import { CompilerService } from '../service/compiler.service';

@Component({
  selector: 'app-exercisepage',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './exercisepage.component.html',
  styleUrls: ['./exercisepage.component.css']
})
export class ExercisePageComponent implements OnInit {
  problemtitle: string = "";
  problemdescription: string = "";
  stackTrace: string = "";
  userCode: string = "";
  solver: boolean = false;

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private http: HttpClient, private router: Router, private solutionService: SolutionsService, private compilerService: CompilerService) { }

  problem: ExerciseResponse = {
    id: 0,
    title: "",
    description: "",
    tester: "",
    creator: "",
    placeholder:"",
  };

  solution: CompilerRequest = {
    exerciseId: "",
    exerciseSolution: "",
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const loggedUsername = localStorage.getItem("loggedUsername");
    if (id && loggedUsername) {
      this.exerciseService.getProblem(id).subscribe({
        next: (data) => {
          this.problemtitle = data.title;
          this.problemdescription = data.description;
          this.problem = data;
          console.log('Datos del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener el problema:', error);
        }
      });
  
      this.solutionService.getSolution(loggedUsername, id).subscribe({
        next: (data) => {
          if (data.username == loggedUsername) {
            this.solver = true;
          }
          console.log('Soluciones del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener las soluciones del problema:', error);
        }
      });
    }
  }
  

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.stackTrace = "";
    if (id) {
      this.solution.exerciseId = id;
      this.solution.exerciseSolution = this.userCode;
      this.compilerService.postSolution(this.solution).subscribe({
        next: (data) => {
          if (data.exerciseCompilationCode != 0) {
            this.stackTrace = data.exerciseCompilationMessage;
          } else {
            if (data.exerciseCompilationCode == 0) {
              this.stackTrace += data.executionMessage;
            }
          }
          console.log("Error al compilar el codigo: ", data);
        },
        error: (error) => {
          console.error("Error al compilar el código:", error);
        }
      });
    }
  }
}
