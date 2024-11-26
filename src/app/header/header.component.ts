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

  searchKeyword:string ="";
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      a=>{if(a)this.updateHeader()}
    );
  }

  loggedUsername = localStorage.getItem("loggedUsername");
  loggedUser = localStorage.getItem("JWT");
  isTester = localStorage.getItem("tester");
  isCreator = localStorage.getItem("creator");

  updateHeader(){
    this.loggedUsername = localStorage.getItem("loggedUsername");
    this.loggedUser = localStorage.getItem("JWT");
    this.isTester = localStorage.getItem("tester");
    this.isCreator = localStorage.getItem("creator");
  }

  logout(){
    localStorage.clear();
    this.updateHeader();
  }
}
