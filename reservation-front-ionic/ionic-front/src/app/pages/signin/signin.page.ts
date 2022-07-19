import { Patient } from './../../models/patient.model';
import { Compte } from './../../models/compte.model';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit,OnDestroy {
  signInForm: FormGroup;
  error: string;
  userSubscription: Subscription;
  constructor(private authService: PatientService, private builder: FormBuilder,private router: Router) { }
  ngOnDestroy(): void {
    if(this.userSubscription === undefined || this.userSubscription === null){
      return;
    }
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.signInForm = this.builder.group({
      login:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
  }
  goBack(){
    this.router.navigateByUrl('home');
  }
  signIn(){
    const compte = new Compte(
      this.signInForm.get('login').value,
      this.signInForm.get('password').value
    );
    this.userSubscription = this.authService.authenticateUser(compte).subscribe(
      (data)=>{
        if(data === null){
          console.log(data);
          this.authService.setAuth(false);
          this.showError('erreur d\'authentification veuillez verifiez votre login ou mot de passe');
          return;
        }else{
          console.log('bien connecte',data);
          this.authService.setAuth(true);
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.authService.setCurrentPatient(data['patient'] as Patient);
          this.router.navigateByUrl('menu/addPreRdv');
          this.initForm();
        }
      },
      (error)=>{
        this.showError('utilisateur inexistant');
      }
    );
  }
  showError(message: string){
    this.error = message;
  }
}
