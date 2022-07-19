import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileSaverModule } from 'ngx-filesaver';
@Component({
  selector: 'app-image-displayer',
  templateUrl: './image-displayer.component.html',
  styleUrls: ['./image-displayer.component.css']
})
export class ImageDisplayerComponent implements OnInit {
  public imageToDisplay;
  public imageBlob;
  public title;
  constructor(private domSanitizer:DomSanitizer,private saveAs:FileSaverModule) { }

  ngOnInit(): void {
  }

  onDownload(){
    if(this.imageToDisplay === undefined) return;
    else{
      saveAs(this.imageToDisplay,this.title+".jpeg");
    }
  }

  createBlobFromString(){
    let img = this.imageToDisplay;
    let canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    let context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
        let link = document.createElement('a');
        link.download = 'example.png';

        link.href = URL.createObjectURL(blob);
        link.click();

        URL.revokeObjectURL(link.href);
      }, 'image/png');

      let link = document.createElement('a');
      link.download = this.title+'.jpeg';
      let blob = new Blob(this.imageToDisplay,{type:'jpeg'});
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
  }
}
