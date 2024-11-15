import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(public fb:FormBuilder, private userService:UserService, private router:Router){}
  incorrectFormSubmited:boolean = false;

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}\w*$/)]],
    password: ['', Validators.required]
  });

  //Corregir el formulario para que se vea mas bonito y tenga validacion bonita y correcta
  onSubmit(){
    if(this.signupForm.valid){
      console.log(JSON.stringify(this.signupForm.value))
      this.userService.registerUser(this.signupForm.value).subscribe(
        response =>{
          console.log('Respuesta API: ', response);
          alert('Formulario enviado');
          this.signupForm.reset();
          this.router.navigate(['/']);
        },
        error =>{
          console.error(error);
          alert('error al enviar el formulario');
        }
      )
    }else{
      alert('Rellena todos los campos');
      this.incorrectFormSubmited=true;
    }
  }
}
