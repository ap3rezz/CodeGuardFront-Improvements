import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
export const routes: Routes = [
    {path: 'signup', component: RegisterComponent},
    {path: '',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'error',component: ErrorComponent},
]
