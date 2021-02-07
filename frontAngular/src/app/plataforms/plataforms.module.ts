import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformsRoutingModule } from './plataforms-routing.module';
import { PlatafomrsListaComponent } from './platafomrs-lista/platafomrs-lista.component';


@NgModule({
  declarations: [PlatafomrsListaComponent],
  imports: [
    CommonModule,
    PlataformsRoutingModule
  ]
})
export class PlataformsModule { }
