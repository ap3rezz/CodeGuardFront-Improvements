import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciseService } from '../service/exercise.service';
import { HttpClient } from '@angular/common/http';
import { ExerciseResponse } from '../model/exercise-response';
import { SolutionsService } from '../service/solutions.service';
import { CompilerService } from '../service/compiler.service';
import { CompilerTestRequest } from '../model/compiler-test-request';
import { marked } from 'marked';

declare var MathJax: any;

@Component({
  selector: 'app-testpage',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestPageComponent implements OnInit, AfterViewChecked {
  problemtitle: string = "";
  problemdescription: string = "";
  stackTrace: string = "";
  userCode: string = "";
  userTestsCode: string = "";
  exercisePlaceHolder: string = ""; 
  solver: boolean = false;
  mathJaxLoaded: boolean = false;
  problemdescriptionHtml: string = ""; 

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private http: HttpClient, private router: Router, private solutionService: SolutionsService, private compilerService: CompilerService) { }

  problem: ExerciseResponse = {
    id: 0,
    title: "",
    description: "",
    placeholder: "",
    tester: "",
    creator: "",
  };

  solution: CompilerTestRequest = {
    exerciseId: 0,
    exerciseSolution: "",
    exerciseTests: "",
    exercisePlaceHolder: "",
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
          this.problemdescriptionHtml = this.convertMarkdownToHtml(this.problemdescription);
          console.log('Datos del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener el problema:', error);
        }
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.problem.creator === "ProjectEuler API" && typeof MathJax !== 'undefined') {
      this.renderMathJax();
    }
  }

  renderMathJax() {
    if (typeof MathJax !== 'undefined') {
      MathJax.typesetPromise();
    }
  }

  onSubmit(): void {
    const id = this.problem.id;
    this.stackTrace = "";
    if (id) {
      this.solution.exerciseId = id;
      this.solution.exerciseSolution = this.userCode;
      this.solution.exerciseTests = this.userTestsCode;
      this.solution.exercisePlaceHolder = this.exercisePlaceHolder; 
      this.compilerService.postTest(this.solution).subscribe({
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

  convertMarkdownToHtml(markdown: string): string {
    
    marked.setOptions({ async: false });
    return marked(markdown) as string;
  }
}
