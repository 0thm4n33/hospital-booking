import { Router } from '@angular/router';
import { PreRendezVous } from './../../../models/prerdv.model';
import { RendezVous } from './../../../models/rendezVous.model';
import { Consultation } from './../../../models/consultation.model';
import { Subscription, Observable } from 'rxjs';
import { RdvServiceService } from './../../services/rdv-service.service';
import { Hopital } from 'src/models/hopital.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Services } from './../../../models/services.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { formatDate } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit,OnDestroy {
  @Input()
  prerdv:PreRendezVous;
  showThis:Boolean;
  formRdv:FormGroup;
  hopitals:Hopital[];
  specialtes:Services[];
  consultations:Consultation[];
  hopitauxSubscription:Subscription;
  serviceSelected:Services;
  hopitalSelected:Hopital;
  today:Date;
  currentDate;
  constructor(private service:SecretaireServiceService,private builder:FormBuilder,
    private rdvService:RdvServiceService,private modal:NgbActiveModal,private router:Router
    ) { }

  ngOnDestroy(): void {
    this.hopitauxSubscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log("pre-rendez-vous ==> ",this.prerdv);
    this.hopitals = [];
    this.consultations = [];
    this.showThis = false;
    this.today = new Date();
    this.currentDate = formatDate(this.today,'yyyy-MM-dd','en-US')
    this.currentDate = this.currentDate + "T08:00"
    console.log(this.currentDate);
    this.initHopitaux();
    this.initForm();
  }

  initForm(){
    this.formRdv = this.builder.group({
        hopital:['',[Validators.required]],
        specialte:['',[Validators.required]],
        consultation:['',[Validators.required]],
        dateRdv:['',[Validators.required]]
    })
  }

  initHopitaux(){
    this.hopitauxSubscription = this.rdvService.getHospitals().subscribe(
      (data:Hopital[])=>{
        console.log("hopitaux => ",data);
        data.forEach(hopital=>{
          const h = new Hopital(hopital.id,hopital.nom);
          this.hopitals.push(h);
          this.rdvService.getServices(hopital.id).subscribe(
            (data)=>{
              data.forEach(service=>{
                if(service.id === +this.prerdv.service.id){
                  this.hopitalSelected = h;
                  this.specialtes = this.hopitals[+this.hopitalSelected.id-1].getServices();
                  this.serviceSelected = service;
                  this.getConsultaion();
                  this.formRdv.controls['hopital'].setValue(h);
                  this.formRdv.controls['specialte'].setValue(service);
                }
                h.add(service);
              })
            },
            (error)=>{
              console.log(error);
            }
          )
        })
      }
    )
    this.showThis = true;
  }

  getConsultaion(){
    this.service.getConsultations(""+this.serviceSelected.id).subscribe(
      (data:Consultation[])=>{
        console.log(data);
        this.consultations = data;
      }
    )
  }

  onSelected(event){
    if(this.hopitals[event-1] !== undefined){
      this.specialtes = this.hopitals[event-1].getServices();
      console.log(this.specialtes);
      this.consultations = null;
    }
  }

  onSelectedService(event){
    console.log("service event ",event);
    this.serviceSelected = event;
    this.getConsultaion();
  }

  onSubmit(){
    let dateRDV =""+this.formRdv.get('dateRdv').value;
    console.log('DATE--> ',dateRDV.replace('T',' '));
    let t = new Date(dateRDV);
    let consultation = this.formRdv.get('consultation').value;
    console.log("consultation ==> ",consultation);
    let rdv = new RendezVous(t,consultation,this.prerdv);
    console.log("rdv ==> ",rdv);
    this.service.add(rdv).subscribe(
      (data)=>{
        this.service.pop(this.prerdv);
        this.service.add(rdv);
        this.modal.close(rdv);
        this.setEtatPreRdv();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setEtatPreRdv(){
    this.service.validatPreRdv(this.prerdv.id).subscribe(
      (data:PreRendezVous)=>{
        console.log('pre rendez vous modifiee --> ',data.etat);
        this.prerdv.etat = "confirmer";
      }
    );
  }
}
