import { OhFourOhComponent } from './../oh-four-oh/oh-four-oh.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from './../../../models/patient.model';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {
  patients:Patient[];
  p:Patient;
  showPatients:Boolean;
  constructor(private service:SecretaireServiceService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.showPatients = false;
    this.patients = [];
    this.getPatients();
  }

 getPatients() {
    console.log("....");
    this.service.getAllPatient().subscribe(
      (data:Patient[])=>{
        console.log(data);
        this.patients = data;
        if(this.patients.length > 0){
          this.showPatients = true;
        }
      }
    )
  }

  patientChange(p:Patient){
    if(p instanceof Event){
      console.log(p);
      if(p.currentTarget == null){
        this.p = null;
        this.open();
      }
    }
    else if(p === null || p === undefined){
      this.open();
      this.p = null;
    }else{
      console.log("event declenched",p);
      if(p instanceof Object){
        this.p = p;
      }
    }
  }

  open(){
    const modalReference = this.modalService.open(OhFourOhComponent);
  }

}

