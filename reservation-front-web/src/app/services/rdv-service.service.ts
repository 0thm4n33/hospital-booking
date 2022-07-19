import { RendezVous } from './../../models/rendezVous.model';
import { PreRendezVous } from './../../models/prerdv.model';
import { Patient } from './../../models/patient.model';
import { Services } from '../../models/services.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Hopital } from 'src/models/hopital.model';
import { stringify } from '@angular/compiler/src/util';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
   })
};
@Injectable({
  providedIn: 'root'
})
export class RdvServiceService {
  private hopitaux:Hopital[];
  private url = "http://localhost:8080";
  hopitauxSubject = new Subject<Hopital[]>();

  constructor(private http:HttpClient) {
    this.init();
  }

  init(){
    this.http.get<Hopital[]>(this.url+"/hopitaux").subscribe(
      (data)=>{
        this.hopitaux = data;
        console.log(this.hopitaux);
      },
      (error)=>{
        console.log("error lors de l'import des hopitaux");
      }
    )
  }

  getHospitals(){
    return this.http.get<Hopital[]>(this.url+"/hopitaux");
  }

  getServices(id:String){
    return this.http.get<Services[]>(this.url+"/services/"+id);
  }

  emitHopitauxSubjet(){
    this.hopitauxSubject.next(this.hopitaux.slice());
  }

  uploadFile(formData:FormData){
    return this.http.post(this.url+"/upload",formData);
  }

  addPreRdv(preRdv:PreRendezVous){
    return this.http.post(this.url+"/patientSpace/addPreRdv",preRdv);
  }

  getPreRdvs(patient:Patient){
    return this.http.get<PreRendezVous[]>(this.url+"/patientSpace/prerdv/"+patient.id);
  }

  getFicheReference(preRdv:PreRendezVous,type:String){
    return this.http.get(this.url+"/patientSpace/prerdv/download/"+preRdv.id+"/"+type,{responseType:"blob"});
  }

  getAllRdvs(patient:Patient){
    return this.http.get(this.url+"/patientSpace/getRdvs/"+patient.id);
  }
  annulerPreRdv(preRdv:PreRendezVous){
    return this.http.get(this.url+"/secretaireSpace/annulerPrdv/"+preRdv.id);
  }
  checkParam(type: string,param: string){
    return this.http.get(this.url+"/check/"+type+"/"+param);
  }
}
