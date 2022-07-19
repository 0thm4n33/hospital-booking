import { RdvToPdfPage } from './../../modals/rdv-to-pdf/rdv-to-pdf.page';
import { ModalController } from '@ionic/angular';
import { PatientService } from 'src/app/services/patient.service';
import { Component, OnInit } from '@angular/core';
import { PreRendezVous } from 'src/app/models/prerendezvous.model';

@Component({
  selector: 'app-list-pre-rdvs',
  templateUrl: './list-pre-rdvs.page.html',
  styleUrls: ['./list-pre-rdvs.page.scss'],
})
export class ListPreRdvsPage implements OnInit {
  imageReferenceIsLoading;
  imagePrescriptionIsLoading;
  imageReference;
  imagePrescription;
  public preRdvs: PreRendezVous[];
  coleur;
  sliderConfig={
    centeredSlides: true,
  };
  constructor(
    private service: PatientService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.preRdvs = [];
    this.getPreRdvs();
  }
  getPreRdvs(){
    this.service.getPreRdvs().subscribe(
      (data: PreRendezVous[])=>{
        console.log(data);
        data.reverse().forEach(pre=>{
          this.getImage(pre,'pre');
          this.getImage(pre,'ref');
          this.preRdvs.push(pre);
        });
      },(error)=>{
        console.log(error);
      }
    );
  }
  getImage(prerdv: PreRendezVous,type: string){
    this.service.getFicheReference(prerdv,type).subscribe(
      (data)=>{
        this.createImageFromBlob(data,type,prerdv);
        if(type === 'ref'){
          console.log('image ref loaded');
          this.imageReferenceIsLoading = true;
        }else if(type === 'pre'){
          console.log('image pre loaded');
          this.imagePrescriptionIsLoading = true;
        }
      }
    );
  }
  createImageFromBlob(image: Blob,type: string,pre: PreRendezVous){
    const reader = new FileReader();
    reader.addEventListener('load',()=>{
      if(type === 'ref'){
        pre.imageReference = reader.result;
      }else if(type === 'pre'){
        pre.imagePrescription = reader.result;
      }
    },false);
    if (image) {
       reader.readAsDataURL(image);
   }
  }
  getPrescription(){
    return this.imagePrescription;
  }
  async open(prerdv,p){
    const modal = await this.modalController.create({
      component: RdvToPdfPage,
      componentProps:{
        rdv: prerdv,
        patient: p
      }
    });
    return await modal.present();
  }
}
