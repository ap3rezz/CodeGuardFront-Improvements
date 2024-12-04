import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RestoreUser } from '../model/restore-user-request';

@Component({
  selector: 'app-restoreuser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './restoreuser.component.html',
  styleUrl: './restoreuser.component.css'
})
export class RestoreuserComponent {

constructor(
  private fb: FormBuilder,
  private userService: UserService,
  private router: Router,
){}

restoreUserForm = this.fb.group({
  username: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]{3,}\w*$/)],],
  password: ['', Validators.required],
  confirm: ['', Validators.required]
});

userNotFound:boolean = false;
invalidCredentials:boolean = false;

onSubmit(){

  if(this.restoreUserForm.valid){
    if(this.restoreUserForm.value.password===this.restoreUserForm.value.confirm){

      console.log(`Sending data: ${JSON.stringify(this.restoreUserForm.value)}`);
      let restoreRequest: RestoreUser = {
        userName:this.restoreUserForm.value.username,
        password:this.restoreUserForm.value.password,
      };

      this.userService.restoreUser(restoreRequest).subscribe(
        response=>{
          console.log(`Api response ${response}`);
          this.restoreUserForm.reset();
          this.router.navigate(['/login']);
        },
        error=>{
          if(error.status===400){
              console.error(`Bad request: incorrect credentials`);

              this.invalidCredentials=true;

          }

          if(error.status===404){
            console.error(`Not found: User not found`)
            this.userNotFound=true;
          }

          this.restoreUserForm.reset();

        }
      )

    }
  }

  

}


}
