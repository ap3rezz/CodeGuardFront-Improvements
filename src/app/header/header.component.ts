import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router){}
  toRegister(){
    this.router.navigate(['/signup']);
  }
  toLogin(){
    this.router.navigate(['/login']);
  }

  //TODO: MOSTRAR O DEJAR DE MOSTRAR EL BUSCADOR DE MAGOS Y EL VISOR DEL PERFIL DEPENDIENDO DE
  //SI ESTA LOGEADO O NO
}
