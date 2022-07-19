import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  addAccount(){
    console.log('compte creer');
    this.router.navigateByUrl('inscription-patient');
  }
  signIn(){
    this.router.navigateByUrl('signin');
  }
}
