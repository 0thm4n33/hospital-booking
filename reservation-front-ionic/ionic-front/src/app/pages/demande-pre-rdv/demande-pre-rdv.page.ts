import { PatientService } from 'src/app/services/patient.service';
import { Services } from './../../models/service.model';
import { Hopital } from './../../models/hopital.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreRendezVous } from 'src/app/models/prerendezvous.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-pre-rdv',
  templateUrl: './demande-pre-rdv.page.html',
  styleUrls: ['./demande-pre-rdv.page.scss'],
})
export class DemandePreRdvPage implements OnInit {
  hopitauxSubscription: Subscription;
  prerdvForm: FormGroup;
  hopitaux: Hopital[];
  services: Services[];
  private selectedFile: File;
  private pathReference;
  private pathPrescription;
  private serviceSelected;
  constructor(private builder: FormBuilder, private service: PatientService,private router: Router) { }

  ngOnInit() {
    this.hopitaux = [];
    this.services = [];
    this.initForm();
    this.initHopitaux();
  }
  initForm(){
    this.prerdvForm = this.builder.group({
      hopital:['',[Validators.required]],
      service:['',[Validators.required]],
      reference:['',[Validators.required]],
      prescription:['',[Validators.required]]
    });
  }
  initHopitaux(){
    this.hopitauxSubscription = this.service.getHospitals().subscribe(
      (data: Hopital[])=>{
        data.forEach(hopital=>{
          const h = new Hopital(hopital.id,hopital.nom);
          this.hopitaux.push(h);
          this.service.getServices(hopital.id).subscribe(
            (services)=>{
              services.forEach(service=>{
                h.add(service);
              });
            },
            (error)=>{
              console.log(error);
            }
          );
        });
      }
    );
  }
  onSelectedService(event){
    this.serviceSelected = event;
    console.log(this.serviceSelected);
  }
  onSelected(event){
    this.services = this.hopitaux[event-1].getServices();
    console.log(this.services);
  }
  onUploadPrescription(event){
    if(event.target.files[0] !== undefined){
      this.upload(event,1);
    }
    else{
      alert('Veuillez uploader la fiche de reference');
    }
  }
  upload(event,index){
    this.selectedFile=event.target.files[0] as File;
      const formData = new FormData();
      formData.append('image',this.selectedFile,this.selectedFile.name);
      const subscriber = this.service.uploadFile(formData).subscribe(
        (data)=>{
          console.log(data);
         if(index === 1){
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.pathReference = ''+data['response'];
          console.log('path ref ',this.pathReference);
         }
         else if(index === 2){
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.pathPrescription = ''+data['response'];
          console.log('path pre ',this.pathReference);
         }
        },
        (error)=>{
          console.log('error',error);
        }
      );
  }
  onUploadReference(event){
    if(event.target.files[0] !== undefined){
      this.upload(event,2);
    }
  }
  onSubmitForm(){
    console.log('ref ==> ',this.pathReference,'\n pre ==> ',this.pathPrescription);
    if(this.pathReference === undefined || this.pathPrescription === undefined){
      return;
    }
    const hopital = this.prerdvForm.get('hopital').value;
    const service = this.prerdvForm.get('service').value;
    const reference = this.pathReference;
    const prescription = this.pathPrescription;
    const preRdv = new PreRendezVous(reference,prescription,this.service.getCurrentPatient(),service,new Date());
    this.service.addPreRdv(preRdv).subscribe(
      (data)=>{
        console.log('current Patient: ',this.service.getCurrentPatient());
        console.log('Effectuer',data);
        this.router.navigate(['menu/listPreRdvs']);
      },
      (error)=>{
        console.log('Error',error);
      }
    );
  }

}
