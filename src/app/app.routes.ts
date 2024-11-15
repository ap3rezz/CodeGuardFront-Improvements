import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
export const routes: Routes = [
    {path: 'signup', component: RegisterComponent},
    {path: '',component: HeaderComponent},
];
