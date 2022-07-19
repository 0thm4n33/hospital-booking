import { AuthService } from './../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePair } from 'src/models/KeyValuePair';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public links:KeyValuePair[];
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    if(this.authService.getIsAdmin() === false){
      this.links = [
        {key:"addPRdv",value:"Demander un pre-rendez-vous"},
        {key:"listPreRdvs",value:"Vos pre-rendez-vous"},
        {key:"listAllRdvs",value:"Vos rendez-vous"},
        {key:"signin",value:"Se deconnecter"}
      ]
    }
    else if(this.authService.getIsAdmin() === true){
      this.links = [
        {key:"listAllPreRdvs",value:"Liste les pre-rendez-vous"},
        {key:"listAllPatiens",value:"Lister les patients"},
        {key:"AllRdvs",value:"Lister les rendez-vous"},
        {key:"signin","value":"Se deconnecter"}
      ]
    }
  }

}
