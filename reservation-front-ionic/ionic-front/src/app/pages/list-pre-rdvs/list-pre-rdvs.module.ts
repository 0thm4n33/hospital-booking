import { PreRdvPage } from './../pre-rdv/pre-rdv.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPreRdvsPageRoutingModule } from './list-pre-rdvs-routing.module';

import { ListPreRdvsPage } from './list-pre-rdvs.page';
import { PreRendezVous } from 'src/app/models/prerendezvous.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPreRdvsPageRoutingModule
  ],
  declarations: [ListPreRdvsPage]
})
export class ListPreRdvsPageModule {}
