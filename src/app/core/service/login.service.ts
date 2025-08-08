import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
   credenciales={
    nombreU: "",
    contrasenha:""
  }
  constructor(
    private httpLogin:HttpClient,
  ) { }
  public autenticarUsuario(c:any):Observable<any>{
     this.credenciales=c;
     console.log(c);
    return this.httpLogin.post<any>(`${environment.apiUrl}autenticacion/login`,c,{
      withCredentials:true, //permite enviar y recibir cookies y guardarlas en el navegador 
      observe:'response',
      headers:new HttpHeaders({
        'content-Type':'application/json'
      })
    })
  }
  cerrarSesion(id:number){
    console.log('cerrando sesion');
    return this.httpLogin.post(`${environment.apiUrl}autenticacion/logout`,{id},{
      withCredentials:true,
      observe:'response',
      headers:new HttpHeaders({
        'content-Type':'application/json'
      })  
    })
  }
  refresh(u_id:number){
    return this.httpLogin.post(`${environment.apiUrl}autenticacion/refresh`,{u_id},{
      withCredentials:true,
      observe:'response',
    })
  }
  /*
    public registrarPersona(p:Persona):Observable<any>{
    console.log("en el service")
    return this.httpPersona.post<any>(`${environment.apiUrl}persona/registraPersona`,p,{
      observe:'response',
      headers:new HttpHeaders({
        'contenttype':'application/json'
      })
    })
  }
  */
}
