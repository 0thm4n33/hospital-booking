import { RendezVous } from './../../../models/rendezVous.model';
import { Patient } from 'src/models/patient.model';
import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-rdvpdf',
  templateUrl: './rdvpdf.component.html',
  styleUrls: ['./rdvpdf.component.css']
})
export class RdvpdfComponent implements OnInit {
  @Input()
  patient:Patient;
  @Input()
  rdv:RendezVous;
  constructor() { }

  ngOnInit(): void {
  }
  toPDF(){
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save("consultation.pdf");
    });
  }

  getDateRendezVous(){
    console.log('in ')

    return this.rdv.dateRendezVous.toLocaleString().replace('T',' à ');
  }
}
