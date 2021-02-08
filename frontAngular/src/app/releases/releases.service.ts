import { take, tap } from 'rxjs/operators';
import { Releases } from './releases';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  private readonly APISELECT = 'http://localhost:3000/select/?opcaoSelect=RELEASES&daTabelaEmQue=';
  private readonly APIINSERT = 'http://localhost:3000/insert/';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Releases[]>(this.APISELECT)
    .pipe(
      tap(console.log)
    );
  }

  create(releases : Releases) {
    return this.http.post(this.APIINSERT + releases.GAME +
                           ".." + releases.PLATAFORM + 
                           ".." + "DATA" +
                           ".." + releases.VERSION, null).pipe(take(1));
  }

}
