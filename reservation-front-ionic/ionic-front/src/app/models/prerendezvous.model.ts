import { PatientService } from 'src/app/services/patient.service';
import { RendezVous } from './rendezvous.model';
import { Services } from './service.model';
import { Patient } from './patient.model';
export class PreRendezVous{
  public imagePrescription;
  public imageReference;
  constructor(
    public ficheRefernce: string,
    public prescription: string,
    public patient: Patient,
    public service: Services,
    public createdAt?: Date,
    public etat?: string,
    public id?: string,
    public rendezVous?: RendezVous
  ){}
  setImagePrescritption(image){
    this.imagePrescription = image;
  }
  setImageReference(image){
    this.imageReference = image;
  }
}
