import { Injectable } from '@angular/core';
import { RespuestaValidacion } from './respuestaValidaciones';

@Injectable({
  providedIn: 'root'
})
export class ValidarNumeros{
  private readonly formatoCelularRegex= /^[67]\d{7}$/;
  private readonly formatoCI=/^[^0]\d{5,7}$/;
  private readonly formatoNIT=/^[^0]\d{10}$/;

  public verificarNumeroTelefono(num:string):RespuestaValidacion{
    //console.log(num, typeof num);
    const vacio=this.cadenaVacia(num);   
    if(vacio){
      return{
        mensaje:"El numero de celular es requerido.",
        validacion:false
      }
    }
    if(this.formatoCelularRegex.test(num)){
      return {
        mensaje:"",
        validacion:true
      }
    }else{
      return {
        mensaje:"El numero de celular debe empezar con 6 o 7 y tener 8 digitos",
        validacion:false
      }
    }
  }
  
  public verficartipoDoc(num:string,tipo:string):RespuestaValidacion{
    if(!tipo){
      return{
        mensaje:"El tipo de documento es requerido.",
        validacion:false
      }
    }else{
      let respuesta:RespuestaValidacion={mensaje:"",validacion:false};
      switch(tipo){
        case "nit":{
          respuesta=this.numeroNIT(num);
          break;
        }
        case "ci":{
          respuesta=this.numeroCI(num);
          break;
        }
        default:{
          respuesta={mensaje:"Tipo de documento no valido.",validacion:false}
        }       
      } 
      return respuesta;
    }
  }

  private numeroCI(num:string):RespuestaValidacion{
    const vacio=this.cadenaVacia(num);
    if(vacio){
      return{mensaje:"El numero de documento es requerido",validacion:false}
    }
    if(this.formatoCI.test(num)){
      return {mensaje:"",validacion:true}
    }else return{
      mensaje:"El CI debe tener de 6 a 8 digitos.",
      validacion:false
    }
  }
  private numeroNIT(num:string):RespuestaValidacion{
    if(this.formatoNIT.test(num)){
        return {mensaje:"",validacion:true}
    }else return{
      mensaje:"El NIT debe tener 10 digitos.",
      validacion:false
    }
  }
  
  private cadenaVacia(num:string){
    let vacio=false;
    if(num==="undefined"||num==="null"||num===undefined){
      console.log("num");
       vacio=true;
    }
    return vacio;
  }  
}