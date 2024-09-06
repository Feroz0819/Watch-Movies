import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlayComponent } from './play/play.component';
import { deactGuard } from './services/deact.guard';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent,
    canDeactivate: [deactGuard] 
  },
  {
    path:"favorites",
    component:FavouritesComponent,
    canActivate: [authGuard] 
  },
  {
    path:"play/:id",
    component:PlayComponent,
    canActivate: [authGuard] 
  },
  {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
  },
  {
        path: "**",
        component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
