import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

type Obj = { [key: string]: number[] };

@Injectable({
  providedIn: 'root',
})
export class DataService {
  stream$: Observable<any>;
  constructor() {
    this.stream$ = of({
      numbers: [],
      dates: [],
      math: [],
    }).pipe(
      switchMap((obj: Obj) =>
        Object.keys(obj).map((key) => {
          for (let i = 0; i < 5; i++) {
            let x = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            obj[key].push(x);
          }
          return obj;
        })
      ),
      catchError(() => of(1))
    );
  }
}
