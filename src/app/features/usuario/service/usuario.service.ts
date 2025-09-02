import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments/environment';
import { RegistrarUsuarioDto } from '../model/registra-usuario.dto';
import { modificarUsuarioDto } from '../model/modificar-usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( 
    private http:HttpClient
  ) { }
  buscarUsuarios(datos:any){ //simplificar
    console.log(datos) 
    const params=new HttpParams();
    const cadena = Object.entries(datos)
      .filter(([_, valor]) => valor !== null && valor !== undefined && valor !== '')
      .map(([clave, valor]) => `${clave}=${valor}`)
      .join('&');
      console.log(cadena);
    return this.http.get<Usuario[]>(`${environment.apiUrl}usuario/listar?${cadena}`,{
      withCredentials:true,});
  }
//localhost:3000/usuario/buscarUsuarioId/3
  public buscarUsuarioPorId(id:string){
    console.log("en serve")
    return this.http.get<any>(`${environment.apiUrl}usuario/buscarUsuarioId/${id}`,{
      withCredentials:true,
      observe:'response',
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    });
  }
  public registrarUsuario(u:RegistrarUsuarioDto):Observable<HttpResponse <RegistrarUsuarioDto>>{
    return this.http.post<RegistrarUsuarioDto>(`${environment.apiUrl}usuario/registrar`,
    u,{
      withCredentials:true,
      observe:'response' as const,
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    });
  }

  public modificarUsuarioAdmin(u:modificarUsuarioDto,id:string){
    console.log("en el servi editando user");
    return this.http.patch<modificarUsuarioDto>(`${environment.apiUrl}usuario/actualizarUsuario/${id}`,u,{
      observe:'response'
    })
  }
  public editarMiPerfil(formData:FormData){
    console.log(formData.get('fotografia'));
    return this.http.patch<any>(`${environment.apiUrl}usuario/editarMiPerfil`,formData,{
      observe:'response'
  });
}
  public EliminarUsuario(id:number, ci:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}usuario/Eliminar/${id}/${ci}`);
  }

}//fin del service
