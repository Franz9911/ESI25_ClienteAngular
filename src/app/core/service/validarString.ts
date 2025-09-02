import { Injectable } from '@angular/core';
import { RespuestaValidacion } from './respuestaValidaciones';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ValidarString{
  //caracteres no validos
  //private readonly invalidosCharsRegex = /[,.:;={}]/;
  //con espacio en la cadena
  private readonly BuscarEspaciosRegex = /\s/;
  //*******************validar contraseñas Fuertes 
  //la cadena debe tener al menos una mayuscula.
  private readonly BuscarMayusculas = /(?=.*[A-ZÑ])/; 
  //la cadena debe tener al menos una minuscula.
  private readonly BuscarMinusculas = /(?=.*[a-zñ])/;
  //la cadena debe tener al menos un numero.
  private readonly BuscarNumeros = /(?=.*\d)/;
  //la cadena debe tener al menos un caracter especial. 
  private readonly BuscarCaracteresEspeciales =/(?=.*[^a-zA-Z0-9\s])/


  //solo permite letras mayusculas minusculas y espacios
  private readonly NombresApellidosRegex=/[^a-zA-ZñÑ ]/; 
  //correos validos
  private readonly formatoCorreoRegex=/^[a-zA-Z0-9_ñÑ]+([._'`"][a-zA-Z0-9ñÑ!#$%&*+/=?^{|}~]+)*@[a-zA-Z0-9_ñÑ]+([.][a-zA-Z0-9_ñÑ]+)*[.][a-zA-Z]{2,5}$/;

  public verificarNombresApellidos(nombre: string, min:number, max:number):RespuestaValidacion{
    const base=this.VerificarLongitud(nombre,min,max);
      if(base.validacion){
        if(this.NombresApellidosRegex.test(nombre)){ //la cadena tiene numeros o caracteres no permitidos
          return{
            mensaje:" solo permite el uso de letras mayusculas y minusculas.",
            validacion:false
          }
        }
      }
    return base;
  }

  //nombre de usuarios con numeros y caracteres 
  public verificarNombreUsuario(nomU:string, min:number, max:number){
    const base=this.VerificarLongitud(nomU,min,max);
    if(base.validacion){ //cumple con la logitud
      if(!this.BuscarEspaciosRegex.test(nomU)){ // la cadena no tiene espacios
         
      }else return { //tiene espacios
            mensaje:"no debe tener espacios",
            validacion:false        
      }
    } //no cumple con longitud         
    return base;
  }
  
  public VerificarContrasenhaFuerte(contrasenha:string, min:number, max:number){
    const base = this.VerificarLongitud(contrasenha,min,max);
    if(base.validacion){ //cumple cn las condiciones de longitd
      if(!this.BuscarEspaciosRegex.test(contrasenha)){ //la contraseña no tiene espacios
        if(this.BuscarMayusculas.test(contrasenha)){ //coontraseña tiene una mamyuscula
          if(this.BuscarNumeros.test(contrasenha)){ //contraseña tiene un numero
            if(this.BuscarCaracteresEspeciales.test(contrasenha)){ //contraseña tiene un caracter especial
              if(this.BuscarMinusculas.test(contrasenha)){ //contraseña tiene una minuscula
                //si la contraseña es valida retornamos base. que es igual a true.
              }else{
                return {
                  mensaje:"La Contraseña debe tener al menos una letra minuscula.",
                  validacion:false     
                }
              }         
            }else{
              return {
                mensaje:"La Contraseña debe tener al menos una caracter especial que no sea un numero o letra.",
                validacion:false     
              }
            }
          }else{
            return {
              mensaje:"La Contraseña debe tener al menos un numero.",
              validacion:false     
            }
          }
        }else{
          return {
            mensaje:"La Contraseña debe tener al menos una letra mayúsculas.",
            validacion:false     
          }
        }
        
        //si la contraseña es fuerte no hacemos nada   
      }else return { //si la contraseña tiene espacios 
          mensaje:"no debe tener espacios",
          validacion:false 
      } 
    } 
    return base;
  }

  VerificarCorreos(correo:string,min:number, max:number){
    const base=this.VerificarLongitud(correo,min,max)
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
  VerificarDirecciones(dir:string,min:number, max:number){
    const base=this.VerificarLongitud(dir,min,max);
    if(base.validacion){
      
    }
    return {
      validacion:true,
        mensaje: ""
    }
  }

  VerificarLongitud(palabra:string,min:number, max:number){
    console.log(palabra);
    if(!palabra){
      return{
        mensaje:"no debe estar vacía.",
        validacion:false
      }
    }
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