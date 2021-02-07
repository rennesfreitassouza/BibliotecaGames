import { Component, OnInit } from '@angular/core';
import { Releases } from './../releases';
import { ReleasesService } from './../releases.service';

@Component({
  selector: 'app-releases-lista',
  templateUrl: './releases-lista.component.html',
  styleUrls: ['./releases-lista.component.scss']
})
export class ReleasesListaComponent implements OnInit {

  releases: Releases[] = [{GAME: 0, PLATAFORM: 0, RELEASEDATE: new Date(), VERSION: 0}];

  constructor(private service: ReleasesService) { }

  ngOnInit(): void {
    this.service.list().subscribe(dados => this.releases = dados);
    
  }

}
