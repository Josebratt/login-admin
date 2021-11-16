import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { map } from "rxjs/operators";

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfile = () => map ((user: any) => user ? ['profile', (user as any).uid]: true);
const onlyAllowSelf = (next: { params: { id: any; }; }) => map (user => (!!user && next.params.id == (user as any).uid || ['']));
const routes: Routes = [
  { path: '', component: 
  LoginComponent, 
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: redirectLoggedInToProfile }
},
  { path: 'profile/:id', 
    component: ProfileComponent, 
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: onlyAllowSelf }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
