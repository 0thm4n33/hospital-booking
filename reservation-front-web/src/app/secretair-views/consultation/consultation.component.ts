import { Consultation } from './../../../models/consultation.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  @Input()
  consultations:Consultation[]
  constructor() { }

  ngOnInit(): void {
    this.consultations = [];
  }

}
