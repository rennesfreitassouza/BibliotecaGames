import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  {
    path: 'plataforms',
    loadChildren: () => import('./plataforms/plataforms.module').then(m => m.PlataformsModule)
  },
  {
    path: 'releases',
    loadChildren: () => import('./releases/releases.module').then(m => m.ReleasesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
