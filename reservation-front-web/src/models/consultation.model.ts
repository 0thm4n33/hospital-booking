import { Services } from './services.model';
export class Consultation{
  constructor(public id:String,
              public nom:String,
              public prix:Number,
              public service:Services
    ){}
}
