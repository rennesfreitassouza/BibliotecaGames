import { Plataforms } from './../plataforms';
import { Component, OnInit } from '@angular/core';
import { PlataformsService } from './../plataforms.service';

@Component({
  selector: 'app-platafomrs-lista',
  templateUrl: './platafomrs-lista.component.html',
  styleUrls: ['./platafomrs-lista.component.scss']
})
export class PlatafomrsListaComponent implements OnInit {

  plataforms: Plataforms[] = [{PLATAFORMS_ID: 0, NAME: ""}];

  constructor(private service: PlataformsService) { }

  ngOnInit(): void {
    this.service.list().subscribe(dados => this.plataforms = dados);
  }

  onDelete(plataforms : Plataforms){
    console.log(plataforms.NAME);
    this.service.remove(plataforms).subscribe(
      success=> {
        this.service.list().subscribe(dados => this.plataforms = dados);
      },
      error => console.error(error),
      () => console.log('completed request')
    );
  }

}
