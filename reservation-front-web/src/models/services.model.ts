import { Batiment } from './batiment.model';
export class Services{
  constructor(public id:Number,public name:String,
              public batiment?:Batiment,
              public numero?:String
    ){}
}
