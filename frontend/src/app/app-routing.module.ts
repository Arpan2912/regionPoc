import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../app/admin/admin.component';
import { AppComponent } from '../app/app.component';
import { UserComponent } from '../app/user/user.component';
import { RegisterComponent } from '../app/register/register.component';
import { LoginComponent } from '../app/login/login.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
