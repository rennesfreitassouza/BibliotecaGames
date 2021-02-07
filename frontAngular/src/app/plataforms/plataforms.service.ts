import { tap } from 'rxjs/operators';
import { Plataforms } from './plataforms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlataformsService {

  private readonly API = 'http://localhost:3000/select/?opcaoSelect=PLATAFORMS&daTabelaEmQue=';
  
  constructor(private http: HttpClient) { }

  list () {
    return this.http.get<Plataforms[]>(this.API)
    .pipe(
      tap(console.log)
    );
  }
}
