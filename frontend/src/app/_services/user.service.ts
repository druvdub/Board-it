import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  /**
   * sends request to endpoint
   *
   * @param board - string with board name
   * @param columns - string with column data
   * @returns {Observable} - sends POST request with { board, columns }
   */
  sendData(board: string, columns: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/data/board`,
      { board, columns },
      httpOptions
    );
  }

  /**
   * sends request to endpoint
   *
   * @returns {Observable} - sends GET request to fetch data
   */
  fetchData(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/data/board/fetch`, {
      responseType: 'text',
    });
  }
}
