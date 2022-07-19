import { Batiment } from './batiment.model';
import { Consultation } from './consultation.model';
import { PreRendezVous } from './prerendezvous.model';
export class RendezVous{
  constructor(
    public dateRendezVous: Date,
    public consultations: Consultation,
    public preRendezVous?: PreRendezVous,
    public batiment?: Batiment,
    public id?: string
  ){}

}
