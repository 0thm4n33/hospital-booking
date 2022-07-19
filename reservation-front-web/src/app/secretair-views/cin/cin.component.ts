import { Patient } from './../../../models/patient.model';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cin',
  templateUrl: './cin.component.html',
  styleUrls: ['./cin.component.css']
})
export class CinComponent implements OnInit {
  @Input()
  patient:Patient;
  public imageCin;
  public cinLoaded:boolean;
  constructor(private service:SecretaireServiceService) { }

  ngOnInit(): void {
    this.cinLoaded = false;
    this.getCin();
  }

  getCin(){
    this.service.getCinPatient(this.patient).subscribe(
      (data)=>{
        this.createImageFromBlob(data);
        this.cinLoaded = true;
      }
    )
  }

  createImageFromBlob(image:Blob){
    let reader = new FileReader();
    reader.addEventListener("load",()=>{
     this.imageCin = reader.result;
    },false);
    if (image) {
      reader.readAsDataURL(image);
   }
  }

}
