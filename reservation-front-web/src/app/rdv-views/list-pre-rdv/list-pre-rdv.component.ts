import { AuthService } from './../../services/auth.service';
import { PreRendezVous } from './../../../models/prerdv.model';
import { RdvServiceService } from './../../services/rdv-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-pre-rdv',
  templateUrl: './list-pre-rdv.component.html',
  styleUrls: ['./list-pre-rdv.component.css']
})
export class ListPreRdvComponent implements OnInit,OnDestroy {
  public preRdvs:PreRendezVous[]
  public preRdvsSubscription:Subscription;
  p: number = 1;
  show:boolean = false;
  constructor(private service:RdvServiceService,private userService:AuthService) { }


  ngOnInit(): void {
    this.preRdvsSubscription = this.service.getPreRdvs(this.userService.getCurrentPatient()).subscribe(
      (data:PreRendezVous[])=>{
        console.log(data);
        this.preRdvs = data.reverse();
        if(this.preRdvs.length > 0){
          this.show = true;
        }else{
          this.show = false;
        }
        this.userService.getCurrentPatient().preRdvs = data;
        console.log(this.userService.getCurrentPatient().preRdvs);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  scrollUp(){
    window.scroll(0,0);
  }

  ngOnDestroy(): void {
    this.preRdvsSubscription.unsubscribe();
  }
}
