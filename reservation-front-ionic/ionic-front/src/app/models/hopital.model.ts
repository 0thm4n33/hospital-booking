import { Services } from './service.model';
export class Hopital {
  private services: Services[];

  constructor(public id: string,public nom: string)
  {
    this.services = [];
  }

  add(service: Services): void{
    this.services.push(service);
  }

  getServices(): Services[]{
    return this.services;
  }

}
