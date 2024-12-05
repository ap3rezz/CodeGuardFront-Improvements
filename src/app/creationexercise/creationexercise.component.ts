import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../service/exercise.service';
import { CreateExerciseRequest } from '../model/create-exercise-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creationexercise',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './creationexercise.component.html',
  styleUrl: './creationexercise.component.css'
})
export class CreationExerciseComponent implements OnInit{

  constructor(private fb: FormBuilder,
    private exerciseservice: ExerciseService,
    private router: Router
  ) { }

  exercise =  this.fb.group({
    title: ['',Validators.required],
    description: ['',Validators.required],
  });

  exercisedata: CreateExerciseRequest={
    title:"",
    description:"",
  }
  
  ngOnInit(): void {
    if(!sessionStorage.getItem("JWT")){
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (this.exercise.valid && this.exercise.value.title && this.exercise.value.description) {
      this.exercisedata.title = this.exercise.value.title;
      this.exercisedata.description = this.exercise.value.description;

      this.exerciseservice.postProblem(this.exercisedata).subscribe({       
         next: (data)=>{
           console.log("Problema creado: ",data);
           if(sessionStorage.getItem("tester")=="true"){
            this.router.navigate(['/test/'+data.id]); 
           }
           else{
             this.router.navigate(['/']);
           }
        },
        error: (error)=>{
          console.error("Error al crear el problema: ",error);
        }
      })
    }
  
     
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
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

