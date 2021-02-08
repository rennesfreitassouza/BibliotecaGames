import { take, tap } from 'rxjs/operators';
import { Plataforms } from './plataforms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlataformsService {

  private readonly APISELECT = 'http://localhost:3000/select/?opcaoSelect=PLATAFORMS&daTabelaEmQue=';
  private readonly APIINSERT = 'http://localhost:3000/insert/';

  constructor(private http: HttpClient) { }

  
  list () {
    return this.http.get<Plataforms[]>(this.APISELECT)
    .pipe(
      tap(console.log)
    );
  }

  create(plataforms : Plataforms) {
    return this.http.post(this.APIINSERT + plataforms.NAME, null).pipe(take(1));
  }
}
