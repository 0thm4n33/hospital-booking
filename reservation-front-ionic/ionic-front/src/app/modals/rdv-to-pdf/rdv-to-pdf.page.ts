/* eslint-disable @typescript-eslint/quotes */
import { Patient } from './../../models/patient.model';
import { RendezVous } from './../../models/rendezvous.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
@Component({
  selector: 'app-rdv-to-pdf',
  templateUrl: './rdv-to-pdf.page.html',
  styleUrls: ['./rdv-to-pdf.page.scss'],
})
export class RdvToPdfPage implements OnInit {
  modalId: number;
  modalTitle: string;
  rdv: RendezVous;
  patient: Patient;
  constructor(
    private modalController: ModalController,
    private navParms: NavParams,
    private pdfG: PDFGenerator
  ) { }

  ngOnInit() {
    console.log(this.navParms);
    this.patient = this.navParms.data.patient;
    this.rdv = this.navParms.data.rdv;
  }
  async closeModal(){
    await this.modalController.dismiss('coco');
  }
  toPdf(){
      console.log(' genereation pdf en cours ...');
      const content = document.getElementById('rdvHTML').innerHTML;
      const options = {
        documentSize: 'A4',
        type: 'share',
        // landscape: 'portrait',
        fileName: 'RendezVouus.pdf'
      };
      this.pdfG.fromData(content, options)
        .then((base64) => {
          console.log('OK', base64);
        }).catch((error) => {
          console.log('error', error);
        });
  }
}
