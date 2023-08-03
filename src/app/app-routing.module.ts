import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ConversationHistoryComponent } from './conversation-history/conversation-history.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Set login as the default page
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserListComponent },
  { path: 'conversationhistory', component:  ConversationHistoryComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
