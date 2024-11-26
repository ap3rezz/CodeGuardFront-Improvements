import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder) {}
  
  user = this.fb.group({
    username: ['', Validators.required],
  });

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      a => { if (a) this.updateHeader(); }
    );
  }

  loggedUsername = localStorage.getItem("loggedUsername");
  loggedUser = localStorage.getItem("JWT");
  isTester = localStorage.getItem("tester");
  isCreator = localStorage.getItem("creator");

  updateHeader() {
    this.loggedUsername = localStorage.getItem("loggedUsername");
    this.loggedUser = localStorage.getItem("JWT");
    this.isTester = localStorage.getItem("tester");
    this.isCreator = localStorage.getItem("creator");
  }

  logout() {
    localStorage.clear();
    this.updateHeader();
  }

  onSearch() {
    if (this.user.valid && this.user.value.username){
      this.userService.getUser(this.user.value.username).subscribe({
        next: (data) => {
          console.log("Datos del usuario: ", data);
          this.router.navigate(['/user', data.username]);
        },
        error: (error) => {
          console.error("El usuario no existe: ", error); 
        }
      });
    }
  }
}
