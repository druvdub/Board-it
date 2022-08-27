import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_KEY: string = 'auth-user';
  private TOKEN: string = 'auth-token';
  private REFRESH_TOKEN: string = 'auth-refreshtoken';
  private isLogged: boolean = false;

  constructor(private router: Router) {}

  clean(): void {
    this.isLogged = false;
    window.sessionStorage.clear();
    // this.router.navigate(['login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN);
    window.sessionStorage.setItem(this.TOKEN, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(this.REFRESH_TOKEN);
    window.sessionStorage.setItem(this.REFRESH_TOKEN, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(this.REFRESH_TOKEN);
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

  public setLogin(bool: boolean): void {
    this.isLogged = bool;
  }
}
