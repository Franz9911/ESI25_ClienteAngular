import { Injectable } from '@angular/core';
import { RespuestaValidacion } from './respuestaValidaciones';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ValidarString{
  //caracteres no validos
  readonly invalidosCharsRegex = /[,.:;={}]/;
  //con espacio en la cadena
  readonly cadenaConEspacioRegex = /\s/;
  //validar contraseñas Fuertes 
  readonly ContFuerteRegex = /^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\d)(?=.*[#&$@!%?¡+^|~_()¿]).+$/;
  //solo permite letras mayusculas minusculas y espacios
  readonly LetrasRegex=/[^a-zA-ZñÑ ]/; 
  //correos validos
  readonly formatoCorreoRegex=/^[a-zA-Z0-9_ñÑ]+([._'`"][a-zA-Z0-9ñÑ!#$%&*+/=?^{|}~]+)*@[a-zA-Z0-9_ñÑ]+([.][a-zA-Z0-9_ñÑ]+)*[.][a-zA-Z]{2,5}$/;
 

  public nombresConEspacio(nombre: string, min:number, max:number):RespuestaValidacion{
    const base=this.validarLongitud(nombre,min,max);
      if(base.validacion){
        if(this.LetrasRegex.test(nombre)){ //la cadena tiene numeros o caracteres no permitidos
          return{
            mensaje:" no debe contener números ni caracteres especiales como: %,&,# ",
            validacion:false
          }
        }
      }
    return base;
  }

  //nombre de usuarios con numeros y caracteres 
  public nombreNumCaract(nomU:string, min:number, max:number){
    const base=this.validarLongitud(nomU,min,max);
    if(base.validacion){ //cumple con la logitud
      if(!this.cadenaConEspacioRegex.test(nomU)){ // la cadena no tiene espacios
        if(this.invalidosCharsRegex.test(nomU)){ // la cadena tiene caracteres invalidos
          return {
            mensaje:"no debe tener caracteres restringidos: , . : ; = { } [ ]",
            validacion:false        
          }
        } //no tiene caracteres invalidos    
      }else return { //tiene espacios
            mensaje:"no debe tener espacios",
            validacion:false        
      }
    } //no cumple con longitud         
    return base;
  }
  
  public contrasenhaFuerte(contrasenha:string, min:number, max:number){
    const base = this.validarLongitud(contrasenha,min,max);
    if(base.validacion){ //cumple cn las condiciones de longitd
      if(!this.cadenaConEspacioRegex.test(contrasenha)){ //la contraseña no tiene espacios
        if(!this.ContFuerteRegex.test(contrasenha)){ //la contraseña no es fuerte
          return {
            mensaje:"debe tener números, mayúsculas, minúsculas y caracteres especiales. Los siguientes caracteres no están permitidos:  \\ , . : ; = { } [ ] - \" \'",
            validacion:false     
          }
        } //si la contraseña es fuerte no hacemos nada   
      }else return { //si la contraseña tiene espacios 
          mensaje:"no debe tener espacios",
          validacion:false 
      } 
    } 
    return base;
  }

  validarCorreo(correo:string,min:number, max:number){
    const base=this.validarLongitud(correo,min,max)
    if(base.validacion){
      if(!this.formatoCorreoRegex.test(correo)){ //la cadena no tienen formato de correo
        return {
          validacion:false,
          mensaje:" no es valido. Ejem de formato:Juan123%.Perez+12@gmail.com"
        }
      }
    }
    return base;
  }
  validarDireccion(dir:string,min:number, max:number){
    const base=this.validarLongitud(dir,min,max);
    if(base.validacion){
      if(this.invalidosCharsRegex.test(dir)){
        return{
          validacion:false,
          mensaje: "la direccion no es valida"
        }
      }
    }
    return {
      validacion:true,
        mensaje: ""
    }
  } 

  validarLongitud(palabra:string,min:number, max:number){
    const longitud=palabra.trim().length;
    console.log(longitud)
    if(longitud===0){
      return {
        mensaje: " no puede estar vacía",
        validacion:false        
      }
    }else if(longitud<min||longitud>max){
      console.log("j")
      return {
        mensaje: `debe tener de ${min} a ${max} caracteres`,
        validacion:false        
      }
      }else return {
        mensaje:"",
        validacion:true
      }
  } 
} 