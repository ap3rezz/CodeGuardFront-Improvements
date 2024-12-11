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
  
  exerciseTitle:string="";
  exerciseDescription:string="";
  exerciseDescriptionHtml:string="";
  exercisePlaceholder:string="";
  exerciseCreator:string="";
  exerciseTester:string="";
  stackTrace:string="";
  userCode:string="";
  userTestsCode:string="";
  //exerciseNewTest:string="";

  constructor(private adminService:AdminService, private route: ActivatedRoute, private exerciseService: ExerciseService, private http: HttpClient, private router: Router, private compilerService: CompilerService) { }

  exercise: ExerciseResponse = {

    id:0,
    creator:"",
    description:"",
    placeholder:"",
    tester:"",
    title:"",

  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const loggedUsername = sessionStorage.getItem("loggedUsername");
    if(!sessionStorage.getItem("JWT")){
      this.router.navigate(['/login']);
    }
    
    if(id){
      this.exerciseService.getProblem(id).subscribe({
        next: (data) => {
          console.log(`Api Response: ${data}, ${data.title}`)
          this.exerciseTitle=data.title;
          this.exerciseDescription=data.description;
          this.exerciseCreator=data.creator;
          this.exerciseTester=data.tester;
          this.exercisePlaceholder=data.placeholder;
        },error:(error)=>{
          console.error(`Error al obtener: ${error}`)
  
        }
      });
    }


  }

  ngAfterViewChecked(): void {
    if (this.exercise.creator === "ProjectEuler API" && typeof MathJax !== 'undefined') {
      this.renderMathJax();
    }
  }

  renderMathJax() {
    if (typeof MathJax !== 'undefined') {
      MathJax.typesetPromise();
    }
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if(id && this.userTestsCode){
      this.adminService.changeExerciseTest(id, this.userTestsCode).subscribe({
        next:(next)=>{
          console.log(`API REQUEST ${id}, ${this.userTestsCode}`);
          this.router.navigate(['/exerciselist']);
          console.log(`API REPSONSE ${next}`);

        },
        error:(error)=>{
          console.error(`API REQUEST ${this.userTestsCode}`);
          console.error(`API RESPONSE ${error}`);
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