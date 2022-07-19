import { Patient } from './patient.model';
import { Batiment } from './batiment.model';
import { PreRendezVous } from './prerdv.model';
import { Consultation } from './consultation.model';
export class RendezVous{
  patient:Patient;
  constructor(
    public dateRendezVous:Date,
    public consultations:Consultation,
    public preRendezVous?:PreRendezVous,
    public batiment?:Batiment,
    public id?:String
  ){}
}
