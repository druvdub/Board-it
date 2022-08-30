import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  submitted: boolean = false;
  isSuccessful: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      this.authService.signup(email, password).subscribe({
        next: (data: any) => {
          this.isSuccessful = true;
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.signupForm.reset();
          this.isSuccessful = false;
          console.log(error);
        },
      });
    }
  }
}
