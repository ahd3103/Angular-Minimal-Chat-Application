import { Component } from '@angular/core';
import { ChatservicesService } from '../services/chatservices.service';
import { User } from '../model/User.model';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  user: User;
  successMessage: string | undefined;
  errorMessage = '';
  registrationForm: FormGroup; 

  constructor(private chatService: ChatservicesService) {
    this.user = new User();
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/)])
    });
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.user.name = this.registrationForm.get('name')?.value;
      this.user.email = this.registrationForm.get('email')?.value;
      this.user.password = this.registrationForm.get('password')?.value;

      this.chatService.postUserRegister(this.user).subscribe(
        (res) => {
          console.log(res);
          this.successMessage = 'Registration successfully completed.';
          this.resetForm();
        },
        (err) => {
          console.log(err);
          this.errorMessage = err;
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  private resetForm(): void {
    this.registrationForm.reset();
    this.errorMessage = '';
  }
}
