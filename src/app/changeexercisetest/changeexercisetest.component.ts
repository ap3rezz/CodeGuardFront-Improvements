import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { ExerciseService } from '../service/exercise.service';
import { OnInit } from '@angular/core';
import { CompilerTestRequest } from '../model/compiler-test-request';
import { ExerciseResponse } from '../model/exercise-response';
import { CompilerService } from '../service/compiler.service';
import { marked } from 'marked';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../service/admin.service';
import { CompilerRequest } from '../model/compiler-request';
import { FormsModule } from '@angular/forms';

declare var MathJax: any;

@Component({
  selector: 'app-changeexercisetest',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './changeexercisetest.component.html',
  styleUrl: './changeexercisetest.component.css'
})
export class ChangeexercisetestComponent implements OnInit, AfterViewChecked {
  problemtitle: string = "";
  problemdescription: string = "";
  stackTrace: string = "";
  userCode: string = "";
  userTestsCode: string = "";
  exercisePlaceHolder: string = ""; 
  solver: boolean = false;
  mathJaxLoaded: boolean = false;
  problemdescriptionHtml: string = ""; 
  exerciseIdRoute:string|null|undefined = "";

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private http: HttpClient, private router: Router, private compilerService: CompilerService, private adminService:AdminService) { }

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
    const loggedUsername = sessionStorage.getItem("loggedUsername");
    if(!sessionStorage.getItem("JWT")){
      this.router.navigate(['/login']);
    }
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
        this.exerciseIdRoute=this.route.snapshot.paramMap.get('id');
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
              this.adminService.changeExerciseTest(this.exerciseIdRoute, this.solution.exerciseTests).subscribe(
                response=>{
                  console.log(`API response: ${response}`)
                  this.router.navigate([``]);
                },error=>{
                  console.error(`ERROR: ${error}`)
                }
              );
            }
          }
          console.log("Resultado de la compilación: ", data);
        },
        error: (error) => {
          console.error("Error al compilar el código:", error);
          if(error.status == 400){
            this.stackTrace="One class name is not well written, The placeholder is compulsory";
          }
          if(error.status == 408){
            this.stackTrace="Time limit exceeded";
          }
          if(error.status == 500){
            this.stackTrace="Internal Server Error";
          }
        }
      });
    }
  }

  convertMarkdownToHtml(markdown: string): string {
    
    marked.setOptions({ async: false });
    return marked(markdown) as string;
  }

  handleTab(event: KeyboardEvent){
    if (event.key === 'Tab'){
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value=
        textarea.value.substring(0,start) + '\t' + textarea.value.substring(end);

      textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
  }

}