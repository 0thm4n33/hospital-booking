import { PatientService } from './../../services/patient.service';
import { Patient } from './../../models/patient.model';
import { Compte } from './../../models/compte.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-inscription-patient',
  templateUrl: './inscription-patient.page.html',
  styleUrls: ['./inscription-patient.page.scss'],
})
export class InscriptionPatientPage implements OnInit {
  inscriptionForm: FormGroup;
  villes = ['FES','MEKNES','TAZA'];
  errorCin: string;
  errorIPP: string;
  errorEmail: string;
  errorTelephone: string;
  private pathCin: string;
  constructor(private builder: FormBuilder,private router: Router,
              private service: PatientService
              ) { }
  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.inscriptionForm = this.builder.group({
      ipp:[''],
      cin:['',[Validators.required,Validators.pattern(/[a-zA-Z0-9]{6}/)]],
      prenom:['',[Validators.required]],
      nom:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      numeroTelephone:['',[Validators.required,Validators.pattern(/[0-9]{10}/)]],
      adresse:['',[Validators.required]],
      ville:['',[Validators.required]],
      password:['',[Validators.required]],
      passwordConfirm:['',[Validators.required]],
      cinUploaded:['',[Validators.required]]
    });
  }
  goBack(){
    this.router.navigateByUrl('/home');
  }
  onSubmitForm(){
    if(this.pathCin === undefined && !this.clean()){
      return;
    }
    const compte = new Compte(this.inscriptionForm.get('email').value,this.inscriptionForm.get('password').value);
    const patient = new Patient(
      this.inscriptionForm.get('ipp').value,
      this.inscriptionForm.get('cin').value,
      this.inscriptionForm.get('nom').value,
      this.inscriptionForm.get('prenom').value,
      this.inscriptionForm.get('numeroTelephone').value,
      this.inscriptionForm.get('adresse').value,
      this.inscriptionForm.get('ville').value,
      this.pathCin,
      compte
    );
    this.service.createUser(patient).subscribe(
      (data)=>{
        console.log('patient bien creer ',data);
        this.router.navigate(['']);
        this.initForm();
      },(error)=>{
        console.log(error);
      }
    );
  }
  onUploadCin(event){
      const selectedFile=event.target.files[0] as File;
      const formData = new FormData();
      formData.append('image',selectedFile,selectedFile.name);
      this.service.uploadFile(formData).subscribe(
        (data)=>{
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.pathCin = ''+data['response'];
          console.log(this.pathCin);
        }
      );
  }
  onFocusOutCin(field){
    let value = '';
    if(field === 'phone'){
       value = this.inscriptionForm.get('numeroTelephone').value;
       if(value.length !== 10){
         this.errorTelephone = 'ce numero de telephone est inccorecte';
         return;
       }
    }else{
       value = this.inscriptionForm.get(field).value;
    }
    if(field === 'cin'){
      if(value.length !== 6 ){
        this.errorCin = 'Cin n\'est pas valide (minimun 6 caractere)';
        return;
      }
      if(field === 'ipp'){
        if(value === ''){
          this.errorIPP = '';
          return;
        }
      }
    }
    this.check(value,field);
  }
  check(param,type){

    if(param === '' || param === undefined){
      return;
    }
    console.log('value ---> ',param);
    this.service.checkCin(param,type).subscribe(
      (data)=>{
        if(data === true){
          if(type === 'cin'){
            this.errorCin = 'Un compte existe deja avec cette CIN ';
          }
          else if(type === 'ipp'){
            this.errorIPP = 'un compte existe deja avec ce IPP';
          }
          else if(type === 'email'){
            this.errorEmail = 'un compte existe deja avec cet email';
          }
          else if(type === 'phone'){
            this.errorTelephone = 'un compte existe deja avec ce numero de telephone';
          }
        }
      }
    );
  }
  clear(type){
    if(type === 'cin'){
      this.errorCin = '';
    }
    else if(type === 'ipp'){
      this.errorIPP = '';
    }
    else if(type === 'email'){
      this.errorEmail = '';
    }
    else if(type === 'phone'){
      this.errorTelephone = '';
    }
  }
  clean(){
    if(this.errorCin === '' && this.errorEmail === '' && this.errorTelephone === ''){
      return true;
    }
    else{
      return false;
    }
  }
}
