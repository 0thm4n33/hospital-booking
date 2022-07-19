import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionPatientPage } from './inscription-patient.page';

const routes: Routes = [
  {
    path: '',
    component: InscriptionPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionPatientPageRoutingModule {}
