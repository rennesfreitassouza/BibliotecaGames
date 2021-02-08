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
  private readonly APIDELETE = 'http://localhost:3000/delete/?opcaoDelete=RELEASES';
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

  remove(releases: Releases) {
    console.log("Remove: "+releases.GAME + " " + releases.PLATAFORM + " " + releases.RELEASEDATE + " " + releases.VERSION);
    return this.http.delete(this.APIDELETE + "&game="+ releases.GAME+ "&plataform=" + releases.PLATAFORM +"&version=" + releases.VERSION).pipe(take(1));
  }

}
