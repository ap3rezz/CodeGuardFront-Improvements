import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../model/signup-request';
import { AuthService } from '../service/auth.service';

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
    private router: Router,
    private authService: AuthService
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
          console.log('Respuesta API: ', response.body);
          console.log('Respuesta API: ', response.headers.get('Authorization'));
          if (response.headers.get('Authorization')) {
            localStorage.setItem('JWT', response.headers.get('Authorization'));
            localStorage.setItem('loggedUsername', response.body.username);
            //TODO:corregir todo esto para ponerlo bonito cuando este el back bien
            this.userService.getUser(response.body.username).subscribe(
              response=>{
                console.log(response)
                localStorage.setItem('tester', response.tester.toString());
                localStorage.setItem('creator', response.creator.toString());
                this.authService.setLoggedIn(true); //Se establece que esta logeado para actualizar la parte de la izquierda del header
              },
              error=>{console.log(error)}
            )
            localStorage.setItem('admin', response.body.admin.toString());
            this.authService.setLoggedIn(true);//Se establece que esta logeado para actualizar la parte de la derecha del header
            this.router.navigate(['/']);
          }
          //TODO: control de errores si no devuelve un jwtKey
          //TODO: recibir y almacenar si el usuario es tester o creator
          //TODO: cambiar en el header para que solo salga una pestaña a no ser que tengas los roles de arriba
          //TODO: cambiar el header para cuando NO estes logeado salga solo register y login y cuando estes logeado salga search wizards y username
        },
        error =>{
          //TODO: correcto control de errores si la peticion no es valida (si no se valida que el usuario
          //y la contraseña son correctos)
          console.log(error);
        }
      );

    }
  }

}
