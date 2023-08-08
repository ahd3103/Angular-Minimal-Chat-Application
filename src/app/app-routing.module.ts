import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';
import { LogHistoryComponent } from './log-history/log-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Set login as the default page
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',component: UserListComponent,
    children: [{ path: ':userId', component: LogViewerComponent }],
  },
  { path: 'logs', component: LogHistoryComponent },
  { path: 'dash', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
