import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Patient } from './../../../models/patient.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-ipp',
  templateUrl: './search-ipp.component.html',
  styleUrls: ['./search-ipp.component.css']
})
export class SearchIppComponent implements OnInit {
  patient:Patient;
  valeur:String="";
  selectedOption:String;

  @Input()
  options:String[];

  @Output()
  change:EventEmitter<Patient> = new EventEmitter<Patient>();

  @Input()
  confirmed:Patient[];

  constructor(private service:SecretaireServiceService) { }

  ngOnInit(): void {
    if(this.options === undefined || this.options.length ===0){
      this.options = ['IPP','NOM','CIN'];
    }
  }

  onSearch(){
    console.log('selected option .. ',this.selectedOption);
    this.patient = null;
    if(this.confirmed === undefined || this.confirmed === null || this.selectedOption === undefined){
      return;
    }
    if(this.valeur !== null || this.valeur !== ""){
      if(this.selectedOption === 'IPP'){
        this.searchByIPP(this.valeur);
      }else if(this.selectedOption === 'NOM'){
        this.searchByNom(this.valeur);
      }else if(this.selectedOption === 'CIN'){
        this.searchByCin(this.valeur);
      }
    }
    this.change.emit(this.patient);
  }
  searchByIPP(value:String){
    this.patient = this.confirmed.find(p=> p.ipp == value);
  }
  searchByNom(value:String){
    this.patient = this.confirmed.find(p=> p.nom === value);
  }
  searchByCin(value:String){
    console.log('recherche par cin ...')
    this.patient = this.confirmed.find(p=> p.cin === value);
  }
}
