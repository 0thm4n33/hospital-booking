import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RdvToPdfPage } from './rdv-to-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: RdvToPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RdvToPdfPageRoutingModule {}
