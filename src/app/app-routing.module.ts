import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

// const route: Routes =[{path:'', redirectTo: 'register', pathMatch:'full'},
// { path: 'register', component: RegistrationComponent },
//  ]
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Set login as the default page
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
