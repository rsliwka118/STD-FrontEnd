import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/Other/home/home.component';
import { RegisterComponent } from './Components/Other/register/register.component';
import { LoginComponent } from './Components/Other/login/login.component';
import { MoviesComponent } from './Components/Other/movies/movies.component';
import { PageNotFoundComponent } from './Components/Other/page-not-found/page-not-found.component';
import { DashboardGuard } from './Guards/dashboard.guard';
import { LoginGuard } from './Guards/login.guard';


const routes: Routes =
    [
        { path: '', component: HomeComponent },
        { path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
        { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
        { path: '**', component: PageNotFoundComponent},
       
      
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
