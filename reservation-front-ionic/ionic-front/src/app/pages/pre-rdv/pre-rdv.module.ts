import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreRdvPageRoutingModule } from './pre-rdv-routing.module';

import { PreRdvPage } from './pre-rdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreRdvPageRoutingModule
  ],
  declarations: [PreRdvPage]
})
export class PreRdvPageModule {}
