import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../model/signup-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]{3,}\w*$/)],],
    password: ['', Validators.required],
  });

  onSubmit(){
    if (this.loginForm.valid){
      let signupRequest: SignupRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.userService.loginUser(signupRequest).subscribe(
        response=>{
          console.log('Respuesta API: ', response);
          //TODO: loclaStorage.save('AuthKey', response.authKey)
          this.loginForm.reset();
          this.router.navigate(['/']);
        },
        error =>{
          //TODO: correcto control de errores si la peticion no es valida
          console.log(error);
        }
      );

    }
  }

}
