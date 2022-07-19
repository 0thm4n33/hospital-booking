import { Patient } from './../../models/patient.model';
import { Compte } from './../../models/compte.model';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
   })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit {
  private isauth:Boolean = false;
  private host:String = "http://localhost:8080";
  private currentPatient:Object;
  private isAdmin:Boolean;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  isAuth():Boolean{
    return this.isauth;
  }

  setIsAuth(value:Boolean):void{
    this.isauth = value;
  }

  setCurrentPatient(patient:Object):void{
    this.currentPatient = patient;
  }

  getCurrentPatient():Patient{
    return <Patient>this.currentPatient;
  }

  authenticateUser(login:String,password:String){
    const compte = new Compte(login,password);
    console.log(compte);
    return this.http.post(this.host+"/patientSpace/login",compte);
  }

  createUser(patient:Patient){
    return this.http.post<Patient>(this.host+"/patientSpace/register",patient,httpOptions);
  }

  setIsAdmin(value:Boolean){
    this.isAdmin = value;
    this.isauth = true;
  }

  getIsAdmin():Boolean{
    return this.isAdmin;
  }


}
