import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionPatientPageRoutingModule } from './inscription-patient-routing.module';

import { InscriptionPatientPage } from './inscription-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscriptionPatientPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InscriptionPatientPage]
})
export class InscriptionPatientPageModule {}
