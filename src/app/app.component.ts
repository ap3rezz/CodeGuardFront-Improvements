import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CodeGuardFront';
}
