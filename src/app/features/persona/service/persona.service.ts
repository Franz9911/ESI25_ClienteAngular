import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private httpPersona:HttpClient
  ) { }
  public buscarPersonas(pagina:number,numItems:number):Observable<Persona[]>{
    const personas= this.httpPersona.get<Persona[]>(`${environment.apiUrl}persona/listar?&page=${pagina}&limit=${numItems}`)
    console.log(personas);
    return personas;
  }

  public buscarPersonaSinUsuario(nombre:string,apellidos:string, pagina:number,numItems:number):Observable<Persona[]>{
    console.log(nombre)
    console.log(apellidos)
    const personas= this.httpPersona.get<Persona[]>(`${environment.apiUrl}persona/buscarPersonasSinUsuario?&nombre=${nombre}&apellidos=${apellidos}&page=${pagina}&limit=${numItems}`) 
    return personas;
  } 
  public registrarPersona(p:Persona):Observable<any>{
    console.log("en el service")
    return this.httpPersona.post<any>(`${environment.apiUrl}persona/registraPersona`,p,{
      observe:'response',
      headers:new HttpHeaders({
        'contenttype':'application/json'
      })
    })
  } 

 
}
