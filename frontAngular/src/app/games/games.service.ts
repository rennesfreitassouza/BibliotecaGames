import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Games } from './games';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly API = 'http://localhost:3000/select/?opcaoSelect=GAMES&daTabelaEmQue=';

  constructor(private http: HttpClient) { }

  
  list () {
    return this.http.get<Games[]>(this.API)
    .pipe(
      tap(console.log)
    );
  }
}
