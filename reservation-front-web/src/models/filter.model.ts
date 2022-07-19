export class FilterObject{
    constructor(public key:string,public values:String[]){}
    add(value:String){
      if(value!=""){
        this.values.push(value);
      }
    }
}
