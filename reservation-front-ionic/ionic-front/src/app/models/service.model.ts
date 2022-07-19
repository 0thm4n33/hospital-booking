import { Batiment } from './batiment.model';
export class Services{
  constructor(public id: number,public name: string,
    public batiment?: Batiment,
    public numero?: string
){}
}
