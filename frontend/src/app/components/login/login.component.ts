import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    this.submitted = false;
    if (this.storageService.isLoggedIn() && this.storageService.getToken()) {
      this.router.navigate(['/home']);
      console.log('it works');
    }
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.storageService.saveUser(data);
          this.storageService.saveToken(data.accessToken);
          this.storageService.saveRefreshToken(data.refreshToken);

          this.isLoggedIn = true;
          this.reloadPage();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loginForm.reset();
          this.isLoggedIn = false;
          console.log(error);
        },
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
