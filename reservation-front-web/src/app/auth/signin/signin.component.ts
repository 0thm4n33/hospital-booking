import { Compte } from './../../../models/compte.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/models/patient.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm:FormGroup;
  errorMessage:String;
  info:any;
  constructor(private builder:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.setIsAuth(false);
    this.initForm();
  }

  initForm(){
    this.signInForm = this.builder.group({
      login:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onSubmitForm(){
    const login = this.signInForm.get("login").value;
    const password = this.signInForm.get("password").value;
    this.authService.authenticateUser(login,password).subscribe(
      (data:any)=>{
        if(data === null){
          console.log("data === null ")
          this.errorMessage = "Veuillez verifier votre email ou mot de passe";
        }
        else if(data !== undefined){
          if(data.patient !== null && data.secretaire === null){
              const compte = new Compte(data.login,data.password);
              const patient = new Patient(data.patient.ipp,
                data.patient.cin,
                data.patient.nom,
                data.patient.prenom,
                data.patient.numeroTelephone,
                data.patient.adresse,
                data.patient.ville,
                data.patient.cinUploaded,
                compte,
                data.patient.id
            )
            this.info=patient;
            this.authService.setCurrentPatient(this.info);
            this.authService.setIsAdmin(false);
            console.log(this.info);
            this.authService.setIsAuth(true);
            this.router.navigate(['addPRdv']);
        }else if(data.secretaire !== null){
          console.log(data);
          this.router.navigate(['listAllPreRdvs'])
          this.authService.setIsAdmin(true);
        }
      }
      else{
          this.errorMessage = "API ne repond pas";
        }
      },
      (error)=>{
        this.errorMessage = "API ne repond pas";
        console.log(error);
      }
    )
  }
}
