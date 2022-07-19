import { Patient } from 'src/models/patient.model';
import { CinComponent } from './../cin/cin.component';
import { AttribuerIPPComponent } from './../attribuer-ipp/attribuer-ipp.component';
import { ActivatedRoute } from '@angular/router';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Attribute, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.css']
})
export class SinglePatientComponent implements OnInit {
  @Input() public patient:Patient;
  public ippDisplay:Boolean;
  showAttribute:Boolean;
  @Input()
  isSingle:boolean;
  verified:Boolean;
  constructor(private service:SecretaireServiceService,private route:ActivatedRoute,
    private modalService:NgbModal) { }

    ngOnInit(): void {
      this.showAttribute = false;
      this.isSingle = false;
      this.verifierPatient();
      if(this.patient === undefined){
        this.isSingle = true;
        let id = this.route.snapshot.params['id'];
        this.service.findPatientById(id).subscribe(
          (data:Patient)=>{
            this.patient = data;
            console.log(this.patient.ipp);
            if(this.patient.ipp === "" || this.patient.ipp === null){
              this.showAttribute=true;
            }
            this.verifierPatient();
          },
          (error)=>{
            console.log("patient not found");
          }
        )
      }
  }
  verifierPatient(){
    this.verified = false;
    this.service.getAllPatient().subscribe(
      (data:Patient[])=>{
        console.log('data ==> ',data);
        console.log('patient ==> ',this.patient);
        data.forEach(p=>{
          if(p.ipp == this.patient.ipp){
            this.verified = true;
          }
        })
      }
    )
  }
  open(){
    const modalReference = this.modalService.open(AttribuerIPPComponent);
    modalReference.componentInstance.patient =  this.patient;
    modalReference.result.then((result)=>{
      console.log("result ==> "+result);
      this.setIPP(result);
    }).catch((error)=>{
      console.log(error);
    })
  }

  showCin(){
    let cinMoal = this.modalService.open(CinComponent);
    cinMoal.componentInstance.patient = this.patient;
  }

  setIPP(ipp){
    this.service.setIpp(this.patient.id,ipp).subscribe(
      (data:Patient)=>{
        console.log("effectuer ==> ",data);
        this.patient = data;
        this.verified = true;
      },(error)=>{
        console.log(error);
      }
    )
  }
}
