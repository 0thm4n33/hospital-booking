import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-oh-four-oh',
  templateUrl: './oh-four-oh.component.html',
  styleUrls: ['./oh-four-oh.component.css']
})
export class OhFourOhComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
