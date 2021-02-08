import { GamesService } from './../games.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Games } from './../games';

import { Location } from '@angular/common';


@Component({
  selector: 'app-games-lista',
  templateUrl: './games-lista.component.html',
  styleUrls: ['./games-lista.component.scss']
})
export class GamesListaComponent implements OnInit {

  games: Games[] = [{GAMES_ID: 0, NAME: "", PUBLISHER: "",}];
  /* deleteModalRef: BsModalRef = this.modalService.show("");
 */
  //@ViewChild('deleteModal', {static: true}) deleteModal: string = "";

  constructor(private service: GamesService, private location: Location) { }/* private modalService: BsModalService ) { }*/
  

  ngOnInit(): void {
    this.service.list().subscribe(dados => this.games = dados);
    
  }

  onDelete(games : Games){
    console.log(games.NAME);
    this.service.remove(games).subscribe(
      success=> {
        this.service.list().subscribe(dados => this.games = dados);
      },
      error => console.error(error),
      () => console.log('completed request')

      // success => {
      //   console.log('Success!');
      //   //this.location.reload();
      // },
      // error => console.error(error),
      // () => console.log('completed request')
    );
  }
}
