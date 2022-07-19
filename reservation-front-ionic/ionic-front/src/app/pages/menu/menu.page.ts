import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menus=[
    {title: 'Demander un rendez-vous',url:'/menu/addPreRdv',icon: 'share'},
    {title: 'Lister vos rendez-vous',url:'/menu/listPreRdvs',icon: 'calendar'},
    {title: 'Se deconnecter',url:'/home',icon: 'log-out'}
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    console.log('bien appele');
  }
  onMenuAction(m){
    console.log(m.url);
    this.router.navigateByUrl(m.url);
  }
}
