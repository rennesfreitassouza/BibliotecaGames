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
  private readonly APIDELETE = 'http://localhost:3000/delete/?opcaoDelete=PLATAFORMS&PLATAFORMSplataforms_IdOrName=';

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

  remove(plataforms: Plataforms) {
    console.log(plataforms.NAME);
    if (plataforms.NAME){
      return this.http.delete(this.APIDELETE + plataforms.PLATAFORMS_ID).pipe(take(1));
    }
    return this.http.delete(`${this.APIDELETE}` + plataforms.NAME).pipe(take(1));
  }
}
