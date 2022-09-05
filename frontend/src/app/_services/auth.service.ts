import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/';

  /**
   *
   * @param http - HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * send request to endpoint
   *
   * @param email - string
   * @param password - string
   * @returns { Observable } POST request to endpoint with { email, password } for login
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/login`,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  /**
   * send request to endpoint
   *
   * @param email - string
   * @param password - string
   * @returns { Observable } POST request to endpoint with { email, password } for signup
   */
  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/signup`,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  /**
   * send request to endpoint
   *
   * @param token - string
   * @returns {Observable} POST request to endpoint with { refreshToken }
   */
  refreshToken(token: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/refreshToken`,
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
}
