import { Router } from '@angular/router';
import { PreRendezVous } from '../../../models/prerdv.model';
import { AuthService } from './../../services/auth.service';
import { Services } from '../../../models/services.model';
import { Hopital } from './../../../models/hopital.model';
import { RdvServiceService } from './../../services/rdv-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demande-rdv',
  templateUrl: './demande-rdv.component.html',
  styleUrls: ['./demande-rdv.component.css']
})
export class DemandeRdvComponent implements OnInit,OnDestroy {

  private hopitaux:Hopital[];
  private services:Services[];
  hopitauxSubscription:Subscription;
  prerdvForm:FormGroup;
  private selectedFile:File;
  private pathReference;
  private pathPrescription;
  private serviceSelected;

  constructor(private rdvService:RdvServiceService,private builder:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.hopitaux = [];
    this.services = [];
    this.initHopitaux();
    this.initForm();
  }

  initForm():void{
    this.prerdvForm = this.builder.group({
      hopital:['',[Validators.required]],
      service:['',[Validators.required]],
      reference:['',[Validators.required]],
      prescription:['',[Validators.required]]
    })
  }

  initHopitaux():void{
    this.hopitauxSubscription = this.rdvService.getHospitals().subscribe(
      (data:Hopital[])=>{
        data.forEach(hopital=>{
          const h = new Hopital(hopital.id,hopital.nom)
          this.add(h);
          this.rdvService.getServices(hopital.id).subscribe(
            (data)=>{
              data.forEach(service=>{
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
  }

  ngOnDestroy(): void {
    this.hopitauxSubscription.unsubscribe();
  }

  get hospitals(){
    return this.hopitaux;
  }
  get servicess(){
    return this.services;
  }

  add(hopital:Hopital):void{
    this.hopitaux.push(hopital);
  }

  onSelected(event){
    this.services = this.hopitaux[event-1].getServices();
    console.log(this.services);
  }

  onSelectedService(event){
    console.log("e ==> ",event);
    this.serviceSelected = event;
  }

  async onUploadReference(event){
    console.log("Entrain d uploader Reference ... ",event)
    if(event.target.files[0] !== undefined){
      this.upload(event,1);

    }
    else{
      alert("Veuillez uploader la fiche de reference")
    }
  }

    onUploadPrescription(event){
    console.log("Entrain d uploader Prescription ... ",event)
    if(event.target.files[0] !== undefined){
      this.upload(event,2);
    }
    else{
      alert("Veuillez uploader la fiche de prescription")
    }
  }

   upload(event,index){
    this.selectedFile=<File>event.target.files[0];
      const formData = new FormData();
      formData.append('image',this.selectedFile,this.selectedFile.name);
      const subscriber = this.rdvService.uploadFile(formData).subscribe(
        (data)=>{
         if(index === 1){
            this.pathReference = ""+data["response"];
            document.getElementById("labelRef").innerHTML = this.pathReference;
         }
         else if(index === 2){
          this.pathPrescription = ""+data["response"];
          document.getElementById("labelPre").innerHTML = this.pathPrescription;
         }
        },
        (error)=>{
          console.log("error ",error);
        }
      )
  }

  onSubmit(){
    const hopital = this.prerdvForm.get("hopital").value;
    const service = this.prerdvForm.get("service").value;
    console.log(service);
    const reference = this.pathReference;
    const prescription = this.pathPrescription;
    let etat = "encours";
    const preRdv = new PreRendezVous(reference,prescription,this.authService.getCurrentPatient(),service,etat,
                  new Date());
    console.log('Pre RendezVous: -->',preRdv)
    this.rdvService.addPreRdv(preRdv).subscribe(
      (data)=>{
        console.log("Effectuer ",data);
        this.router.navigate(["listPreRdvs"]);
      },
      (error)=>{
        console.log("Error ",error);
      }
    )
  }

}
