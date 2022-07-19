import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandePreRdvPageRoutingModule } from './demande-pre-rdv-routing.module';

import { DemandePreRdvPage } from './demande-pre-rdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandePreRdvPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DemandePreRdvPage]
})
export class DemandePreRdvPageModule {}
