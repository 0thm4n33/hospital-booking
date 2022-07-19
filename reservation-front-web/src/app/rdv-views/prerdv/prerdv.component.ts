import { ImageDisplayerComponent } from './../../secretair-views/image-displayer/image-displayer.component';
import { ConfirmePrerdvComponent } from './../../secretair-views/confirme-prerdv/confirme-prerdv.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from './../../../models/patient.model';
import { AuthService } from './../../services/auth.service';
import { PreRendezVous } from './../../../models/prerdv.model';
import { RdvServiceService } from './../../services/rdv-service.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RdvpdfComponent } from '../rdvpdf/rdvpdf.component';

@Component({
  selector: 'app-prerdv',
  templateUrl: './prerdv.component.html',
  styleUrls: ['./prerdv.component.css']
})
export class PrerdvComponent implements OnInit {
  @Input() prerdv:PreRendezVous;
  @Input() patient:Patient;
  @Input() showButton = false;
  @Input() disableDecline;
  @Input() isPatient:boolean;

  @Output()
  change:EventEmitter<boolean> = new EventEmitter<boolean>();
  refresh:boolean;
  showConsultButton:boolean;
  public imageReference;
  public imagePrescription;
  public imageReferenceIsLoading = false;
  public imagePrescriptionIsLoading = false;
  public status;
  private modalRef:NgbModalRef;
  constructor(private service:RdvServiceService,private user:AuthService,
    public modalService:NgbModal
    ) { }

  ngOnInit(): void {
    console.log('init\n',this.prerdv);
    this.getFicheRef();
    this.getFichePre();
    if(this.prerdv.etat === "annuler"){
      this.status = "annuler";
      this.disableDecline = true;
    }
    else if(this.prerdv.rendezVous === null){
      this.prerdv.etat = 'encours';
      this.status = "encours";
    }
    else{
      this.status = "confirmer";
      this.prerdv.etat = 'confirmer';
      this.showButton = false;
      if(this.isPatient){
        this.showConsultButton = true;
      }
    }
    console.log('created At ==> '+this.prerdv.createdAt)
  }

  getService(){
    return this.prerdv.service.name;
  }

  getImage(type:String){
    this.service.getFicheReference(this.prerdv,type).subscribe(
      (data)=>{
        console.log("data Image ",data);
        this.createImageFromBlob(data,type);
        if(type === "ref") this.imageReferenceIsLoading = true;
        else if(type === "pre") this.imagePrescriptionIsLoading = true;
      },(error)=>{
        this.imageReference = false;
      }
    )
  }

  getFicheRef(){
    this.getImage("ref");
  }

  getFichePre(){
    this.getImage("pre");
  }

  createImageFromBlob(image:Blob,type:String){
    let reader = new FileReader();
    reader.addEventListener("load",()=>{
      if(type === "ref") this.imageReference = reader.result;
      else if(type === "pre") this.imagePrescription = reader.result;
    },false);
    if (image) {
      reader.readAsDataURL(image);
   }
  }

  onConfirmPresse(){
    this.open();
  }

  open(){
    console.log(this.prerdv);
    this.modalRef = this.modalService.open(ConfirmePrerdvComponent);
    this.modalRef.componentInstance.prerdv = this.prerdv;
    this.modalRef.result.then(
      (result=>{
        console.log("result==> ",result);
        this.refresh = true;
        this.status = "confirmer";
        this.prerdv.etat = "confirmer";
      })
    );
  }

  onDelete(){
    this.service.annulerPreRdv(this.prerdv).subscribe(
      (data)=>{
        console.log('annuler ',data);
        this.refresh = true;
        this.status = 'annuler';
        this.prerdv.etat = 'annuler';
      }
    )
  }
  onClickImg(type){
    let displayer = this.modalService.open(ImageDisplayerComponent);
    if(type === 'ref'){
      displayer.componentInstance.imageToDisplay = this.imageReference;
      displayer.componentInstance.title = "Fiche de reference";
    }
    else if(type === 'pre'){
      console.log(this.imagePrescription);
      displayer.componentInstance.imageToDisplay = this.imagePrescription;
      displayer.componentInstance.title = "Fiche de prescription";
    }
  }
  onShowRdv(){
    let displayer = this.modalService.open(RdvpdfComponent);
    console.log('rendez-vous ==> ',this.prerdv.rendezVous);
    this.prerdv.rendezVous.dateRendezVous = new Date(this.prerdv.rendezVous.dateRendezVous)
    this.prerdv.rendezVous.dateRendezVous.setHours(this.prerdv.rendezVous.dateRendezVous.getHours()+1,this.prerdv.rendezVous.dateRendezVous.getMinutes(),this.prerdv.rendezVous.dateRendezVous.getSeconds());
    displayer.componentInstance.patient = this.prerdv.patient;
    displayer.componentInstance.rdv = this.prerdv.rendezVous;
  }

}
