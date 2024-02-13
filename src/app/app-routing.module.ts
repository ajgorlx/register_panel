import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandsComponent } from './component/lands/lands.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { ProfileComponent } from './component/profile/profile.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard} from '@angular/fire/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);



const routes: Routes = 
[{
  path:'',
  pathMatch:'full',
  component: LandsComponent,
  
},
{
  path:'home',
  component:HomeComponent,
  ...canActivate(redirectToLogin)
},
{
  path:'login',
  component: LoginComponent, 
  ...canActivate(redirectToHome)
},
{
  path:'sign-up',
  component: SignUpComponent,
  ...canActivate(redirectToHome)
},
{
  path:'admin-panel',
  component:AdminPanelComponent,
  canActivate:[()=> {return true;}]
  
},
{
  path:'profile',
  component:ProfileComponent,
  ...canActivate(redirectToLogin)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
