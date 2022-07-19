import { RdvServiceService } from './../../services/rdv-service.service';
import { Patient } from './../../../models/patient.model';
import { Compte } from './../../../models/compte.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {passwordMatchValidator} from '../../validators/passwordMatchValidator'
import { from } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm:FormGroup;
  villes:String[];
  pathCin:string;
  cinError: boolean;
  emailError:boolean;
  phoneError:boolean;
  mismatchPassword:boolean;
  constructor(private builder:FormBuilder,private service:AuthService,private router:Router,
    private rdvService:RdvServiceService
    ) { }

  ngOnInit(): void {
    this.mismatchPassword = true;
    this.initForm();
    this.villes = ["FES","MEKNES","TAZA"];
  }

  initForm(): void {
    this.signUpForm = this.builder.group({
      ipp:[''],
      cin:['',[Validators.required,Validators.pattern(/[a-zA-Z0-9]{6}/)]],
      prenom:['',[Validators.required]],
      nom:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern(/[0-9]{10}/)]],
      adresse:['',[Validators.required]],
      ville:['',[Validators.required]],
      password:['',[Validators.required]],
      passwordConfirm:['',[Validators.required]],
      cinUploaded:['',[Validators.required]]
    },
    {
      validators:passwordMatchValidator
    });
  }

  onSubmitForm(): void{
    if(this.pathCin === undefined){
      return
    }
    const compte = new Compte(this.signUpForm.get('email').value,this.signUpForm.get('password').value);
    const patient = new Patient(
      this.signUpForm.get('ipp').value,
      this.signUpForm.get('cin').value,
      this.signUpForm.get('nom').value,
      this.signUpForm.get('prenom').value,
      this.signUpForm.get('phone').value,
      this.signUpForm.get('adresse').value,
      this.signUpForm.get('ville').value,
      this.pathCin,
      compte
    );
    this.service.createUser(patient).subscribe(
      ()=>{
        this.router.navigate([''])
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  get email(){
    return this.signUpForm.get("email");
  }
  checkIPP(){
    console.log('entrain de checker le ipp ',this.signUpForm.get('ipp').value);
  }
  onUploadCin(event){
    console.log('e-->\n',event);
    let selectedFile=<File>event.target.files[0];
      const formData = new FormData();
      formData.append('image',selectedFile,selectedFile.name);
      const subscriber = this.rdvService.uploadFile(formData).subscribe(
        (data)=>{
          this.pathCin=""+data["response"]
          console.log(this.pathCin);
          let elem = document.getElementById('labelFile');
          elem.innerHTML = this.pathCin;
        },
        (error)=>{
          console.log("error ",error);
        }
      )
  }
  check(param:string){
    const value = this.signUpForm.get(param).value;
    if(value === '' || value === undefined){
      return;
    }
    this.rdvService.checkParam(param,value).subscribe(data=>{
        if(param === 'cin'){
          (data === true ? this.cinError = true : this.cinError = false);
        }
        else if(param === 'email'){
          (data === true ? this.emailError = true : this.emailError = false);
        }
        else if(param === 'phone'){
          (data === true ? this.phoneError = true : this.phoneError = false);
        }
    });
  }
  checkAll(){
    if(this.cinError === true || this.emailError === true || this.phoneError === true ){
      console.log(this.cinError,this.emailError,this.phoneError);
      return false;
    }
    return true;
  }
  checkPassword(){
    (this.signUpForm.get('password').value === this.signUpForm.get('passwordConfirm').value) ?
            this.mismatchPassword = true : this.mismatchPassword = false;
  }
}
