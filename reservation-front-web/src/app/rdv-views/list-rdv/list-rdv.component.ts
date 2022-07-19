import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RdvServiceService } from './../../services/rdv-service.service';
import { RendezVous } from './../../../models/rendezVous.model';
import { Patient } from './../../../models/patient.model';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RdvpdfComponent } from '../rdvpdf/rdvpdf.component';

@Component({
  selector: 'app-list-rdv',
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css']
})
export class ListRdvComponent implements OnInit {
  patient:Patient;
  rendezVous:RendezVous[];
  @Input()
  rdvSecraitaire:RendezVous[];
  constructor(private auth:AuthService,private service:RdvServiceService,private modalService:NgbModal) { }

  ngOnInit(): void {
    if(this.rdvSecraitaire === undefined){
      this.patient = this.auth.getCurrentPatient();
      this.getAllRdvs();
    }
    else if(this.rdvSecraitaire.length > 0){
      console.log('length ',this.rdvSecraitaire.length);
      this.rendezVous = this.rdvSecraitaire;
    }
  }

  getAllRdvs(){
    this.service.getAllRdvs(this.patient).subscribe(
      (data:RendezVous[])=>{
        this.rendezVous = data;
        console.log("Rendez vous ==> \n",this.rendezVous);
        this.rendezVous.forEach(r=>{
          r.dateRendezVous = new Date(r.dateRendezVous);
          r.dateRendezVous.setHours(r.dateRendezVous.getHours()+1,r.dateRendezVous.getMinutes(),r.dateRendezVous.getSeconds());
          r.patient = this.patient;
        });
      }
    )
  }

  toPDF(rdv:RendezVous){
    let modalRef = this.modalService.open(RdvpdfComponent);
    modalRef.componentInstance.patient = this.patient;
    modalRef.componentInstance.rdv = rdv;
  }
}
