
import { GamesService } from './../games.service';
import { Component, OnInit } from '@angular/core';
import { Games } from './../games';



@Component({
  selector: 'app-games-lista',
  templateUrl: './games-lista.component.html',
  styleUrls: ['./games-lista.component.scss']
})
export class GamesListaComponent implements OnInit {

  games: Games[] = [{GAMES_ID: 0, NAME: "", PUBLISHER: "",}];

  constructor(private service: GamesService) { }

  ngOnInit(): void {
    //@Crossori
    this.service.list().subscribe(dados => this.games = dados);
    //console.log(this.games);
  }

}
