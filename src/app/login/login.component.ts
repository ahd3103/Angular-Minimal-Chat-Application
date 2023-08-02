import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatservicesService } from '../services/chatservices.service';
import { Login, User } from '../model/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: Login;
  errorMessage:string | undefined
  token:string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private chatservice: ChatservicesService
  ) {
    this.loginUser = new Login();
  }

  ngOnInit(): void {}

  login() {
    this.chatservice.postUserLogin(this.loginUser).subscribe((data) => {
      if (data.token) {
       localStorage.setItem('jwtToken', data.token);
       this.router.navigate(['user'])
      }
    });
  }
}
