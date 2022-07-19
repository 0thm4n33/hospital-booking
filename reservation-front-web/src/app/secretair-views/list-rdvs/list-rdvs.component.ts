import { Services } from './../../../models/services.model';
import { RdvServiceService } from './../../services/rdv-service.service';
import { FilterObject } from './../../../models/filter.model';
import { Patient } from './../../../models/patient.model';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { RendezVous } from './../../../models/rendezVous.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-rdvs',
  templateUrl: './list-rdvs.component.html',
  styleUrls: ['./list-rdvs.component.css']
})
export class ListRdvsComponent implements OnInit {
  rendezVous:RendezVous[];
  resultFilter:RendezVous[];
  serviceName:String;
  dateDebut:Date;
  dateFin:Date;
  serviceFilter:FilterObject;
  nameServices:String[];

  constructor(private service:SecretaireServiceService,private rdvService:RdvServiceService) { }

  ngOnInit(): void {
    this.nameServices = [];
    this.resultFilter = [];
    this.rendezVous = [];
    this.getAllRdvs();
    this.rdvService.getServices('1').subscribe(
      (data:Services[])=>{
        data.forEach(d=>{
          this.nameServices.push(d.name);
        })
        this.serviceFilter = new FilterObject('Service',this.nameServices);
        this.nameServices.push("TOUS LES SERVICES");
      }
    )
  }

  getAllRdvs(){
    this.service.getAllRdvs().subscribe(
      (data: RendezVous[])=>{
        console.log(data);
        this.rendezVous = data.reverse();
        this.rendezVous.forEach(r=>{
          this.getPatientByRdv(r);
        });
        this.resultFilter = this.rendezVous;
      }
    )
  }

  getPatientByRdv(rdv:RendezVous){
    this.service.getPatientByRdv(rdv.id).subscribe(
      (data:Patient)=>{
        rdv.patient = data;
      }
    )
  }

  onSearch(){
    this.service.searchBetweenTwoDate(this.dateDebut,this.dateFin).subscribe(
      (data:RendezVous[])=>{
        console.log(data);
        this.resultFilter = [];
        if(this.serviceName === undefined){
          this.resultFilter = data.reverse();
        }else{
          data.reverse().forEach(rdv=>{
            if(rdv.consultations.service.name == this.serviceName){
              this.resultFilter.push(rdv);
            }
          })
        }
        this.resultFilter.forEach(r=>{
          this.getPatientByRdv(r);
        });
      }
    );
  }

  selectedService(serviceName:String){
    this.serviceName = serviceName;
      if(this.dateDebut === undefined && this.dateFin === undefined){
        if(serviceName.startsWith('TOUS')){
          this.resultFilter = this.rendezVous;
          this.serviceName = undefined;
        }
        else{
          this.resultFilter = this.rendezVous.filter(rdv => rdv.consultations.service.name === serviceName );
        }
      }
      else{
        this.resultFilter = [];
        this.rendezVous.forEach(
          (r)=>{
            if(r.dateRendezVous >= this.dateDebut && r.dateRendezVous < this.dateFin){
              this.resultFilter.push(r);
            }
          }
        )
      }
    }

  onR(){
    this.dateDebut = undefined;
    this.dateFin = undefined;
    this.selectedService(this.serviceName);
  }
}
