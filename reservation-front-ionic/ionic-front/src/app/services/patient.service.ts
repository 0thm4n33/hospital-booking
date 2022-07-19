import { Services } from './../models/service.model';
import { Hopital } from './../models/hopital.model';
import { Compte } from './../models/compte.model';
import { Patient } from './../models/patient.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreRendezVous } from '../models/prerendezvous.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private isauth: boolean;
  private currentPatient: Patient;
  private url ='http://localhost:8080';
  constructor(private http: HttpClient){
    this.isauth=false;
  }
  uploadFile(formData: FormData){
    return this.http.post(this.url+'/upload',formData);
  }
  createUser(patient: Patient){
    return this.http.post<Patient>(this.url+'/patientSpace/register',patient);
  }
  setAuth(value: boolean){
    this.isauth = value;
  }
  setCurrentPatient(patient: Patient){
    this.currentPatient = patient;
  }
  getCurrentPatient(){
    return this.currentPatient as Patient;
  }
  authenticateUser(compte: Compte){
    return this.http.post(this.url+'/patientSpace/login',compte);
  }
  isAuth(){
    return this.isauth;
  }
  getHospitals(){
    return this.http.get<Hopital[]>(this.url+'/hopitaux');
  }
  getServices(id: string){
    return this.http.get<Services[]>(this.url+'/services/'+id);
  }
  addPreRdv(preRdv: PreRendezVous){
    return this.http.post(this.url+'/patientSpace/addPreRdv',preRdv);
  }
  getPreRdvs(){
    return this.http.get<PreRendezVous[]>(this.url+'/patientSpace/prerdv/'+this.currentPatient.id);
  }
  getFicheReference(preRdv: PreRendezVous,type: string){
    return this.http.get(this.url+'/patientSpace/prerdv/download/'+preRdv.id+'/'+type,{responseType:'blob'});
  }
  checkCin(param,type){
    return this.http.get(this.url+'/check/'+type+'/'+param);
  }
}
