import { Component, OnInit } from '@angular/core';
import { Services } from './services.model';

export class Hopital {
  private services:Services[];

  constructor(public id:String,public nom:String)
  {
    this.services = [];
  }

  add(service:Services):void{
    this.services.push(service);
  }

  getServices():Services[]{
    return this.services;
  }

}
