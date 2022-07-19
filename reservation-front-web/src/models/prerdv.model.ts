import { RendezVous } from './rendezVous.model';
import { Services } from './services.model';
import { Patient } from 'src/models/patient.model';
export class PreRendezVous{
  constructor(
    public ficheRefernce:String,
    public prescription:String,
    public patient:Patient,
    public service:Services,
    public etat?:String,
    public createdAt?:Date,
    public id?:String,
    public rendezVous?:RendezVous,
    public motifRefus?:String
  ){}
}
