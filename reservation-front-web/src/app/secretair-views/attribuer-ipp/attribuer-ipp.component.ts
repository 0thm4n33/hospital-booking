import { Patient } from './../../../models/patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinglePatientComponent } from './../single-patient/single-patient.component';
import { NgbModal,ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribuer-ipp',
  templateUrl: './attribuer-ipp.component.html',
  styleUrls: ['./attribuer-ipp.component.css']
})
export class AttribuerIPPComponent implements OnInit {
  @Input()
  patient:Patient;
  ippForm:FormGroup;

  constructor(private service:SecretaireServiceService,
    public activeModal:NgbActiveModal,private builder:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ippForm = this.builder.group({
        ipp:['',[Validators.required,Validators.pattern(/[0-9]{1,6}/)]]
      })
  }

  onSubmit(){
    console.log("submit called")
    this.activeModal.close(this.ippForm.get("ipp").value);
  }

  onIPPClick(){
    this.service.getGeneratedIPP().subscribe(
      (ipp:number)=>{
        if(ipp > 1){
          console.log('ipp --> ',ipp);
          this.ippForm.controls['ipp'].setValue(ipp);
        }
      }
    )
    console.log('ipp value ',this.ippForm.get("ipp").value);
  }
}
