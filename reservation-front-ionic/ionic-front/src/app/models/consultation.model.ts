import { Services } from './service.model';
export class Consultation{
  constructor(public id: string,
              public nom: string,
              public prix: number,
              public service: Services
    ){}
}
