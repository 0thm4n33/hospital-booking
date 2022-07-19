import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreRdvPage } from './pre-rdv.page';

const routes: Routes = [
  {
    path: '',
    component: PreRdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreRdvPageRoutingModule {}
