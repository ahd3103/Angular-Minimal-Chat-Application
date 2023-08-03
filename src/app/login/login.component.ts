import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatservicesService } from '../services/chatservices.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel, UserResponse } from '../model/UserResponce.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | undefined;
  token: string = '';
 id:string='';
  constructor(private router: Router, private chatservice: ChatservicesService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/)])
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const loginUser = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.chatservice.postUserLogin(loginUser).subscribe(
        (data:UserModel) => {
          if (data.token) {
            debugger;
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('currentUser', data.profile?.userId!);
            this.router.navigate(['user']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
