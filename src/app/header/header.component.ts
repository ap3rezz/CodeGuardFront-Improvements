import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private router:Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      a=>{if(a)this.update()}
    );
  }

  toRegister(){
    this.router.navigate(['/signup']);
  }
  toLogin(){
    this.router.navigate(['/login']);
  }

  loggedUsername = localStorage.getItem("loggedUsername");
  loggedUser = localStorage.getItem("JWT");
  //TODO: los dos campos de abajo cuando se actualizan no hace que se actualice la lista
  isTester = localStorage.getItem("tester");
  isCreator = localStorage.getItem("creator");

  update(){
    this.loggedUsername = localStorage.getItem("loggedUsername");
    this.loggedUser = localStorage.getItem("JWT");
    this.isTester = localStorage.getItem("tester");
    this.isCreator = localStorage.getItem("creator");
  }

  logout(){
    localStorage.removeItem("JWT");
    localStorage.removeItem("admin");
    localStorage.removeItem("loggedUsername");
    localStorage.removeItem("tester");
    localStorage.removeItem("creator");
    this.update();
  }
}
