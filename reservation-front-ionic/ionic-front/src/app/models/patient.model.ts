import { Compte } from './compte.model';
export class Patient{
  constructor(
    public ipp: string,
    public cin: string,
    public nom: string,
    public prenom: string,
    public numeroTelephone: string,
    public adresse: string,
    public ville: string,
    public cinUploaded: string,
    public compte: Compte,
    public id?: string
    ){}
}
