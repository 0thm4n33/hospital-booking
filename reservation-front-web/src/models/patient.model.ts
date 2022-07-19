import { PreRendezVous } from './prerdv.model';
import { Compte } from './compte.model';
export class Patient{
  private prerdvs:PreRendezVous[];
  constructor(
    public ipp:string,
    public cin:string,
    public nom:string,
    public prenom:string,
    public numeroTelephone:string,
    public adresse:string,
    public ville:string,
    public cinUploaded:string,
    public compte:Compte,
    public id?:string
    ){}

    set preRdvs(prerdvs:PreRendezVous[]){
      this.prerdvs = prerdvs;
    }
    get preRdvs(){
      return this.prerdvs;
    }
}
