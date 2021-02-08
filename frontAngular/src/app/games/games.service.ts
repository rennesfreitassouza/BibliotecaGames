import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Games } from './games';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly APISELECT = 'http://localhost:3000/select/?opcaoSelect=GAMES&daTabelaEmQue=';
  private readonly APIINSERT = 'http://localhost:3000/insert/';
  private readonly APIDELETE = 'http://localhost:3000/delete/?opcaoDelete=GAMES&GAMESgame_IdOrName=';

  constructor(private http: HttpClient) { }

  
  list () {
    return this.http.get<Games[]>(this.APISELECT)
    .pipe(
      tap(console.log)
    );
  }

  create(games : Games) {
    return this.http.post(this.APIINSERT + games.NAME + ".." + games.PUBLISHER, null).pipe(take(1));
  }

  remove(game: Games) {
    console.log(game.NAME);
    if (game.NAME){
      return this.http.delete(this.APIDELETE + game.GAMES_ID).pipe(take(1));
    }
    return this.http.delete(`${this.APIDELETE}` + game.NAME).pipe(take(1));
  }
}
