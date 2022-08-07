import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  constructor(private http: HttpClient) {}

  fetchFact(num: string, type?: string): Observable<string> {
    return this.http
      .get(
        `http://numbersapi.com/${num}/${
          type === 'numbers' ? '' : (type === 'dates' && 'date') || type
        }`,
        { responseType: 'text' }
      )
      .pipe(take(1));
  }
}
