import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatafomrsListaComponent } from './platafomrs-lista/platafomrs-lista.component';
import { PlataformsFormComponent } from './plataforms-form/plataforms-form.component';

const routes: Routes = [
  { path: '', component: PlatafomrsListaComponent },
  { path: 'novo', component: PlataformsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformsRoutingModule { }
