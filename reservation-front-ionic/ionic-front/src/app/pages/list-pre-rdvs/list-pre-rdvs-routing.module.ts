import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPreRdvsPage } from './list-pre-rdvs.page';

const routes: Routes = [
  {
    path: '',
    component: ListPreRdvsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPreRdvsPageRoutingModule {}
