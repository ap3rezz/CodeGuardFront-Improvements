import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../model/signup-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  signupForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}\w*$/)],
    ],
    password: ['', Validators.required],
    confirm: ['', Validators.required],
  });

  confirmPassword: string = '';

  onSubmit() {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirm) {
        console.log(JSON.stringify(this.signupForm.value));

        let signupRequest: SignupRequest = {
          username: this.signupForm.value.username,
          password: this.signupForm.value.password,
        };

        this.userService.registerUser(signupRequest).subscribe(
          (response) => {
            console.log('Respuesta API: ', response);
            this.signupForm.reset();
            this.router.navigate(['/']);
          },
          (error) => {
            console.error(error);
            if(error.status == 409){
              
            }
          }
        );
    }
  }
}
