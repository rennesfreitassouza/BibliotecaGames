import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatafomrsListaComponent } from './platafomrs-lista/platafomrs-lista.component';

const routes: Routes = [
  { path: '', component: PlatafomrsListaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformsRoutingModule { }
