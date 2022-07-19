/* eslint-disable max-len */
import { DemandePreRdvPage } from './../demande-pre-rdv/demande-pre-rdv.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {path:'addPreRdv',loadChildren: ()=> import('../demande-pre-rdv/demande-pre-rdv.module').then(m => m.DemandePreRdvPageModule)},
      {path:'listPreRdvs',loadChildren: ()=> import('../list-pre-rdvs/list-pre-rdvs-routing.module').then(m => m.ListPreRdvsPageRoutingModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
