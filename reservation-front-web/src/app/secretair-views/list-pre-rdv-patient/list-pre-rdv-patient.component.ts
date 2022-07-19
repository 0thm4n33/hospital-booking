import { Services } from './../../../models/services.model';
import { RdvServiceService } from './../../services/rdv-service.service';
import { FilterObject } from './../../../models/filter.model';
import { Subscription } from 'rxjs';
import { PreRendezVous } from './../../../models/prerdv.model';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-list-pre-rdv-patient',
  templateUrl: './list-pre-rdv-patient.component.html',
  styleUrls: ['./list-pre-rdv-patient.component.css']
})
export class ListPreRdvPatientComponent implements OnInit,OnDestroy {
  public prerdvs:PreRendezVous[];
  public preRdvsSubcscription:Subscription;
  private saver:PreRendezVous[];
  p: number = 1;
  etatFilter: FilterObject;
  serviceFilter: FilterObject;
  private nameServices: String[];
  private selectedEtat: String = "encours";
  private selectedService: String;

  constructor(public service:SecretaireServiceService,private rdvService:RdvServiceService) {
  }

  ngOnInit(): void {
    this.nameServices = [];
    this.initPreRdvs();
    this.etatFilter = new FilterObject('Etat',['confirmer','encours','annuler','TOUS']);
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

  initPreRdvs(){
    this.saver = [];
    this.prerdvs = [];
    //console.log("entrain de refraishir ...");
    this.service.getPreRdvs().subscribe(
      (data:PreRendezVous[])=>{
         // console.log('lenght data',data.length);
          /* reverse table
          let index = 0;
          for(let i=data.length-1; i>=0; i--){
              this.prerdvs[index++]=data[i];
          }*/
          console.log('data recieved\n,',this.prerdvs);
          this.prerdvs = data.reverse(); //methode predifine ;)
          //console.log('lenght new table',this.prerdvs.length);
          this.saveData();
          this.getFiltredData();
      }

    )
    /*
    this.preRdvsSubcscription = this.service.preRendezVousSubject.subscribe(
      (rdvs:PreRendezVous[])=>{
        rdvs.forEach(p=>{
          if(p.rendezVous === null){
            this.prerdvs.push(p);
          }
        });
      }
    );
    this.service.emitPreRdvs();*/
  }

  ngOnDestroy(): void {
    if(this.preRdvsSubcscription !== undefined){
      this.preRdvsSubcscription.unsubscribe();
    }
  }

  printSelectedValue(selected:string){
    console.log('info from children .. ',selected);
    this.selectedEtat = selected;
    if(this.selectedEtat.toLowerCase().startsWith('tous')){
      this.prerdvs = this.saver;
    }else{
      this.getFiltredData();
    }
    this.p = 1;
  }

  getFiltredData(){
    let clone = [];
    console.log('lenght of ',this.prerdvs.length);
    for(let item of this.saver){
      clone.push(item);
    }
    console.log(clone);
    this.prerdvs = [];
    clone.forEach(p=>{
      console.log('etat --> ',p.etat,'filter: ',this.selectedEtat);
      if(this.selectedEtat === p.etat){
        if(this.selectedService === undefined || this.selectedService === p.service.name || this.selectedService.toLowerCase().startsWith('tous')){
          this.prerdvs.push(p);
        }
      }
    });
    this.p = 1;
  }

  saveData(){
    for(let p of this.prerdvs){
      this.saver.push(p);
    }
  }

  serviceSelected(serviceName:String){
      this.selectedService = serviceName;
      this.prerdvs = [];
      console.log(this.saver);
      if(this.selectedService.startsWith('TOUS') && this.selectedEtat.startsWith('TOUS')){
        this.putAllServices();
      }else{
        for(let p of this.saver){
          if(p.service.name == this.selectedService){
            console.log(p.service.name,'===',this.selectedService);
            console.log('etat ',this.selectedEtat);
            if(this.selectedEtat == undefined || this.selectedEtat == p.etat || this.selectedEtat.toLowerCase() == 'tous'){
              console.log('added ',this.selectedService);
              this.prerdvs.push(p);
            }
          }
        }
      }
      console.log(this.prerdvs);
      this.p = 1;
  }

  putAllServices(){
    console.log('push all ',this.saver);
    if(this.selectedService.startsWith('TOUS')){
      this.prerdvs = this.saver;
    }else{
      this.saver.forEach(p=>{
      })
    }
  }

  upPage(){
    window.scroll(0,0);
  }

}
