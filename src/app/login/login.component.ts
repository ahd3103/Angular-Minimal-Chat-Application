import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatservicesService } from '../services/chatservices.service';
import { User } from '../model/registration.model';

interface LoginResponse {
  Token: string;
  Profile: any;
  Message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private chatservice: ChatservicesService
  ) {}

  ngOnInit(): void {}

  login() {
    this.errorMessage = '';
    var user = new User();
    user.email = '';
    user.password = '';
    this.chatservice.postloginuser(user).subscribe((data) => {
      if (data) {
      }
    });
  }
}
