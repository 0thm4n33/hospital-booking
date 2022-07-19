import { PatientService } from 'src/app/services/patient.service';
import { Component, Input, OnInit } from '@angular/core';
import { PreRendezVous } from 'src/app/models/prerendezvous.model';

@Component({
  selector: 'app-pre-rdv',
  templateUrl: './pre-rdv.page.html',
  styleUrls: ['./pre-rdv.page.scss'],
})
export class PreRdvPage implements OnInit {
  @Input()
  prerdv: PreRendezVous;
  status: string;
  imageReferenceIsLoading = false;
  imagePrescriptionIsLoading = false;
  imageReference;
  imagePrescription;
  constructor(private service: PatientService) { }

  ngOnInit() {
    this.getFicheRef();
    this.getFichePre();
    if(this.prerdv.rendezVous === null){
      this.status = 'encours';
    }else{
      this.status = 'confirmer';
    }
  }
  getImage(type: string){
    this.service.getFicheReference(this.prerdv,type).subscribe(
      (data)=>{
        this.createImageFromBlob(data,type);
        if(type === 'ref'){
          this.imageReferenceIsLoading = true;
        }else if(type === 'pre'){
          this.imagePrescriptionIsLoading = true;
        }
      },(error)=>{
        this.imageReference = false;
      }
    );
  }
  createImageFromBlob(image: Blob,type: string){
    const reader = new FileReader();
    reader.addEventListener('load',()=>{
      if(type === 'ref'){
        this.imageReference = reader.result;
      }else if(type === 'pre'){
        this.imagePrescription = reader.result;
      }
    },false);
    if (image) {
      reader.readAsDataURL(image);
   }
  }
  getFicheRef(){
    this.getImage('ref');
  }

  getFichePre(){
    this.getImage('pre');
  }

}
