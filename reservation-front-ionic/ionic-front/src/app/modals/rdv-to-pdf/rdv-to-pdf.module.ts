import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RdvToPdfPageRoutingModule } from './rdv-to-pdf-routing.module';

import { RdvToPdfPage } from './rdv-to-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RdvToPdfPageRoutingModule
  ],
  declarations: [RdvToPdfPage]
})
export class RdvToPdfPageModule {}
