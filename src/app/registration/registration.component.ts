import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatservicesService } from '../services/chatservices.service';
import { User } from '../model/registration.model';
//import swal from 'sweetalert';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  user: User;
  successMessage: string | undefined;
  errorMessage = '';

  constructor(
    private chatService: ChatservicesService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {}

  registerUser() {
    this.chatService.postAlluser(this.user).subscribe(
      (res) => {
        console.log(res);
        ///swal('Success!', 'Registration successfully Completed.', 'success');
        this.router.navigate(['/login']); // Redirect to login page on successful registration
      },
      (err) => {
        console.log(err);
        //swal('Error!', err, 'error');
      }
    );
  }
}
