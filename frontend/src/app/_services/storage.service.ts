import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_KEY: string = 'auth-user';
  private isLogged: boolean = false;

  constructor(private router: Router) {}

  clean(): void {
    this.isLogged = false;
    window.sessionStorage.clear();
    // this.router.navigate(['login']);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);

    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      this.isLogged = true;
      return this.isLogged;
    }
    this.isLogged = false;
    return this.isLogged;
  }
}
