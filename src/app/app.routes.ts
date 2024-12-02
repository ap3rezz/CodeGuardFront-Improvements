import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { PersonalpageComponent } from './personalpage/personalpage.component';
import { ExerciseListComponent } from './exerciselist/exerciselist.component';
import { ExercisePageComponent } from './exercisepage/exercisepage.component';
import { ExercisePageSolutionsComponent } from './exercisepagesolutions/exercisepagesolutions.component';
import { CreationExerciseComponent } from './creationexercise/creationexercise.component';
import { UserPageComponent } from './userpage/userpage.component';
import { TestsListComponent } from './testslist/testslist.component';
import { TestPageComponent } from './testpage/testpage.component';

export const routes: Routes = [
    {path: 'signup', component: RegisterComponent},
    {path: '',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'error',component: ErrorComponent},
    {path: 'exerciselist',component: ExerciseListComponent},
    {path: 'personalpage', component: PersonalpageComponent},
    {path: 'problem/:id', component: ExercisePageComponent },
    {path: 'creation',component: CreationExerciseComponent},
    {path: 'problem/:id/solutions', component: ExercisePageSolutionsComponent },
    {path: 'user/:id',component: UserPageComponent},
    {path: 'testslist',component: TestsListComponent},
    {path: 'test/:id', component: TestPageComponent },
]
