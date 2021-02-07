import { tap } from 'rxjs/operators';
import { Releases } from './releases';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  private readonly API = 'http://localhost:3000/select/?opcaoSelect=RELEASES&daTabelaEmQue=';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Releases[]>(this.API)
    .pipe(
      tap(console.log)
    );
  }
}
