import { FilterObject } from './../../../models/filter.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() filters:FilterObject;
  @Output() selected = new EventEmitter<string>();
  filter:string;
  @Input() defaultOption: string;
  constructor() { }

  ngOnInit(): void {
    console.log('default option ==> ',this.defaultOption);
    if(this.defaultOption === undefined){
      return
    }
    else{
      console.log('emission ... ');
      this.filter = this.defaultOption;
      this.onSelected();
    }
  }
  onSelected(){
    console.log('filter selectionner ',this.filter);
    this.selected.emit(this.filter);
  }
}
