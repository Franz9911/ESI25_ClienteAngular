import { Injectable } from '@angular/core';
import { RespuestaValidacion } from './respuestaValidaciones';

@Injectable({
  providedIn: 'root'
})
export class ValidarNumeros{
  readonly formatoCelularRegex= /^[67]\d{7}$/;
  readonly formatoCI=/^[^0]\d{5,7}$/;
  readonly formatoNIT=/^[^0]\d{10}$/;

    public numeroTelefono(num:string):RespuestaValidacion{        
      if(this.formatoCelularRegex.test(num)){
        return {
          mensaje:"",
          validacion:true
        }
      }else{
        return {
          mensaje:"debe tener 8 digitos y empezar con 6 o 7",
          validacion:false
        }
      }
    }
    public numeroCI(num:string):RespuestaValidacion{
      console.log(num)
      if(this.formatoCI.test(num)){
          return {mensaje:"",validacion:true}
      }else return{
          mensaje:"El numero de CI debe tener de 6 a 8 digitos.",
          validacion:false
      }
  }
  public numeroNIT(num:string):RespuestaValidacion{
    if(this.formatoNIT.test(num)){
        return {mensaje:"",validacion:true}
    }else return{
        mensaje:"El numero de NIT debe tener 10 digitos.",
        validacion:false
    }
}
    
}