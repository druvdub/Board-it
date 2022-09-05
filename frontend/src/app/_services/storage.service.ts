import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_KEY: string = 'auth-user';
  private TOKEN: string = 'auth-token';
  private REFRESH_TOKEN: string = 'auth-refreshtoken';
  private isLogged: boolean = false;
  private BOARD_DATA: string = '{"boardName":"Board-it", "columns":[]}';

  constructor(private router: Router) {}

  // clears session storage
  clean(): void {
    this.isLogged = false;
    window.sessionStorage.clear();
    // this.router.navigate(['login']);
  }

  // saves token in session storage
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN);
    window.sessionStorage.setItem(this.TOKEN, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  // gets token from session storage
  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN);
  }

  // saves refresh token in session storage
  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(this.REFRESH_TOKEN);
    window.sessionStorage.setItem(this.REFRESH_TOKEN, token);
  }

  // gets refresh token from session storage
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  // saves user in session storage
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // gets user from session storage
  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);

    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  // checks if logged in
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      this.isLogged = true;
      return this.isLogged;
    }
    this.isLogged = false;
    return this.isLogged;
  }

  // sets isLogged attribute to a boolean
  public setLogin(bool: boolean): void {
    this.isLogged = bool;
  }

  // saves data in session storage
  public setData(board: Board): void {
    window.sessionStorage.removeItem(this.BOARD_DATA);
    window.sessionStorage.setItem(this.BOARD_DATA, JSON.stringify(board));
  }

  // gets data from session storage
  public getData(): any {
    const data = window.sessionStorage.getItem(this.BOARD_DATA);
    if (data) {
      return JSON.parse(data);
    }
  }
}
