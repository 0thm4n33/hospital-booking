import { Subject } from 'rxjs';
import { RendezVous } from './../../models/rendezVous.model';
import { Hopital } from './../../models/hopital.model';
import { Patient } from './../../models/patient.model';
import { Consultation } from './../../models/consultation.model';
import { Services } from './../../models/services.model';
import { PreRendezVous } from './../../models/prerdv.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
   })
};

@Injectable({
  providedIn: 'root'
})
export class SecretaireServiceService {

  private preRendezVous:PreRendezVous[];
  preRendezVousSubject = new Subject<PreRendezVous[]>();
  private url = "http://localhost:8080/secretaireSpace/";

  constructor(public http:HttpClient) {
    this.preRendezVous = [];
    this.getAllPreRdvs();
  }

  emitPreRdvs(){
    console.log("Entrain d'emettre ... ")
    this.preRendezVousSubject.next(this.preRendezVous);
  }

  getAllPreRdvs(){
    this.http.get<PreRendezVous[]>(this.url+"allPreRdv").subscribe(
      (data)=>{
        this.preRendezVous = data;
        this.emitPreRdvs();
      }
    )
  }

  getPreRdvs(){
    return this.http.get<PreRendezVous[]>(this.url+"allPreRdv");
  }

  findPatientById(id:Number){
    return this.http.get<Patient>(this.url+"getPatient/"+id);
  }

  setIpp(id,ipp){
    return this.http.post(this.url+"setIpp/"+id+"/"+ipp,{id,ipp});
  }

  getLastPatient(){
    return this.http.get<Patient>(this.url+"lastPatient");
  }

  getAllPatient(){
    return this.http.get<Patient[]>(this.url+"AllPatient");
  }

  searchByIpp(ipp:Number){
    return this.http.get<Patient>(this.url+"findPatient/"+ipp);
  }

  getConsultations(idService:String){
    return this.http.get<Consultation[]>(this.url+"getConsultation/"+idService);
  }

  getServicesInHospital(idServices){
    return this.http.get<Services[]>(this.url+"getServicesInHospitals/"+idServices);
  }

  getHopital(idService){
    return this.http.get<Services>(this.url+"getHopital/"+idService);
  }

  add(rdv:RendezVous){
    return this.http.post(this.url+"addRdv",rdv);
  }

  pop(prerdv:PreRendezVous){
    let index = this.preRendezVous.indexOf(prerdv);
    if(index > -1){
      this.preRendezVous.splice(index,1);
    }
    this.emitPreRdvs();
  }

  getCinPatient(patient:Patient){
    return this.http.get("http://localhost:8080/patientSpace/prerdv/download/"+patient.id+"/"+"cin",{responseType:'blob'});
  }

  getAllRdvs(){
    return this.http.get(this.url+'getAllRdvs');
  }
  getPatientByRdv(id){
    return this.http.get(this.url+'getPatientByRdv/'+id);
  }
  getGeneratedIPP(){
    return this.http.get(this.url+'getGeneratedIPP');
  }
  validatPreRdv(idPreRdv){
    return this.http.get(this.url+'validateRdv/'+idPreRdv);
  }
  searchBetweenTwoDate(dateDebut,dateFin){
    return this.http.get(this.url+'getRdvBetween?start='+dateDebut+'&end='+dateFin);
  }
}
