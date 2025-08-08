import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( 
    private http:HttpClient
  ) { }
  public listarP():Observable<Usuario[]>{
    console.log("hola desde el servUsario")
    return this.http.get<Usuario[]>(`${environment.apiUrl}usuario/usuario/usuarios`);
  }
  buscarU(datos:any){
    console.log(datos)
    const params=new HttpParams();
    const cadena = Object.entries(datos)
      .filter(([_, valor]) => valor !== null && valor !== undefined && valor !== '')
      .map(([clave, valor]) => `${clave}=${valor}`)
      .join('&');
      console.log(cadena);
    return this.http.get<Usuario[]>(`${environment.apiUrl}usuario/listar?${cadena}`,{
      withCredentials:true,});
    //${id}&nombre=${nombre}}
  }

  public registrarUsuario(u:Usuario):Observable<any>{
    console.log("Entramos al servU");
    console.log(u);
    return this.http.post<any>(`${environment.apiUrl}usuario/registrar`,
    u,{
      withCredentials:true,
      observe:'response',
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    });
  }
  public EliminarUsuario(id:number, ci:number,personaId:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}usuario/Eliminar/${id}/${ci}/${personaId}`);
  }

}//fin del service
