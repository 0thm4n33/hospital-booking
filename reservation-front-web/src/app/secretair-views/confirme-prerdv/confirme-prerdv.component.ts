import { PreRendezVous } from './../../../models/prerdv.model';
import { Hopital } from './../../../models/hopital.model';
import { RdvServiceService } from './../../services/rdv-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Services } from './../../../models/services.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SecretaireServiceService } from './../../services/secretaire-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirme-prerdv',
  templateUrl: './confirme-prerdv.component.html',
  styleUrls: ['./confirme-prerdv.component.css']
})
export class ConfirmePrerdvComponent implements OnInit {
  @Input()
  prerdv:PreRendezVous;
  services:Services[];
  specialite:Services;
  formRdv:FormGroup;

  constructor(private service:SecretaireServiceService,public activeModal:NgbActiveModal,
      public builder:FormBuilder
    ) { }

  ngOnInit(): void {

  }


}

