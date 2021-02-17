import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformsRoutingModule } from './plataforms-routing.module';
import { PlatafomrsListaComponent } from './platafomrs-lista/platafomrs-lista.component';
import { PlataformsFormComponent } from './plataforms-form/plataforms-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlatafomrsListaComponent, PlataformsFormComponent],
  imports: [
    CommonModule,
    PlataformsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlataformsModule { }
