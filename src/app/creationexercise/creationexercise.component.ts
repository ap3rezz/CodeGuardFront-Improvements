import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creationexercise',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './creationexercise.component.html',
  styleUrl: './creationexercise.component.css'
})
export class CreationExerciseComponent{
  problemTitle: string = "";
  problemDescription: string = "";

  constructor() { }


  onSubmit(): void {
    
  
     
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
}

