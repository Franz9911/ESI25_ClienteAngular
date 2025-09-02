import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@validaciones/login.service';
import { ValidarNumeros } from '@validaciones/validarNumeros';
import { ValidarString } from '@validaciones/validarString';
import { RespuestaValidacion } from '@validaciones/respuestaValidaciones';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombreU:string="";
  contrasenha:string="";
  respNom:RespuestaValidacion={validacion:false,mensaje:""}
  respContrasenha:RespuestaValidacion={validacion:false,mensaje:""}

  constructor(
    private loginservice:LoginService,
    private router:Router,
    private validarStr:ValidarString,
    ) { }

  ngOnInit(): void {
  }
//'' OR '1'='1'
  //const response = await lastValueFrom(this.loginServ.verific(this.usuarioL) as Observable<HttpResponse<any>>);
  //if(response.status==201 ){
  iniciarCesion(){
    this.router.navigate(['/Esi']);
    this.validarStr.VerificarContrasenhaFuerte(this.contrasenha,8,12);
    this.validarStr.verificarNombreUsuario(this.nombreU,5,12);
    
    this.loginservice.autenticarUsuario({nombreU:this.nombreU,contrasenha:this.contrasenha}).subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.status===201){
          //console.log("respoonse");
          console.log(response);
          sessionStorage.setItem('fotografia', response.body.fotografia);
          sessionStorage.setItem('u_id', response.body.u_id);
          sessionStorage.setItem('uname', this.nombreU );
          sessionStorage.setItem('u_r', response.body.u_r );
          //this.router.navigate(['/Esi']);

        }
      },error:(error:HttpErrorResponse)=>{
        console.log(error);
        sessionStorage.clear();
      }
    })
    
  } 

}
