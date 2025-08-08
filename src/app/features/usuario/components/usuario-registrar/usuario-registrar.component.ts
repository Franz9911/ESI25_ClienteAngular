import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Persona } from '../../model/persona';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ValidarString} from 'src/app/core/service/validarString';
import { ValidarNumeros } from 'src/app/core/service/validarNumeros';
import { RespuestaValidacion } from 'src/app/core/service/respuestaValidaciones';

import { ConfirmacionDialogoD,DialogoConfirmacionComponent } from 'src/app/elementos-compartidos/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { core } from '@angular/compiler';
import { NuevaPersonaData,PersonaRegistrarComponent } from 'src/app/features/persona/components/persona-registrar/persona-registrar.component';
import { BuscarPersonaData,PersonaBuscarComponent } from 'src/app/features/persona/components/persona-buscar/persona-buscar.component';


@Component({
  selector: 'app-usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.css']
})
export class UsuarioRegistrarComponent implements OnInit {
  usuario:Usuario= new Usuario();
  persona:Persona=new Persona();


  respuestaNomUsu:RespuestaValidacion={validacion:false,mensaje:"no debe estar vacio"};
  respuestaContr:RespuestaValidacion={validacion:false,mensaje:"no debe estar vacia"};
  respuestaRol:RespuestaValidacion={validacion:false,mensaje:"Debe selecionar una opción"};
  respuestaCorreoE:RespuestaValidacion={validacion:false,mensaje:"no debe estar vacio"};
 

  constructor(
    private dialog:MatDialog,
    private nuevaPersonaDialog:MatDialog,
    private buscarPersonaDialog:MatDialog,
    private snackBar:MatSnackBar,
    private ActRouter:ActivatedRoute,
    private UsuarioService:UsuarioService,
    private validarString: ValidarString, 
    private validarNum:ValidarNumeros,
  ) { }

  ngOnInit(): void {
    this.usuario.persona=this.persona;
    this.usuario.rol="";
    this.usuario.estado="Activo";
    console.log(this.persona.numDoc);
  }




  validarNomUsuario(){
    console.log(this.usuario.nombreU);
    this.respuestaNomUsu= this.validarString.nombreNumCaract(this.usuario.nombreU,5,12);
  }
  validarContrasenhaSegura(){
    this.respuestaContr=this.validarString.contrasenhaFuerte(this.usuario.contrasenha,8,12);
  }
  validarRol(){
    switch(this.usuario.rol){
      case "Admi":{
        this.respuestaRol={
          mensaje:"",
          validacion:true
        }
        break;
      }
      case "SerT":{
        this.respuestaRol={
          mensaje:"",
          validacion:true,
        }
        break;
      }
      case "ResV":{
        this.respuestaRol={
          mensaje:"",
          validacion:true
        }
        break;
      }
      default:{
        this.respuestaRol={
          mensaje:"Debe seleccionar un Rol",
          validacion:false 
        }
        break;
      }
    }
  }

  validarCorreoE(){
    this.respuestaCorreoE=this.validarString.validarCorreo(this.usuario.correo,5,30);
  }


  procesar():void{
    if(this.respuestaNomUsu.validacion && this.respuestaContr.validacion && this.respuestaRol.validacion &&
       this.respuestaCorreoE.validacion){
        console.log("todo bien!!");
        const data:ConfirmacionDialogoD={
          titulo:"Registrar Usuario",
          mensaje:"Confirme el registro",
          datos:"nombre: "+this.usuario.persona.nombre+" "+this.usuario.persona.apellidos+"\n "+this.usuario.persona.tipoDoc+" : "+this.usuario.persona.numDoc+
          "\n nombre de usuario: "+ this.usuario.nombreU+ "\n rol: "+ this.usuario.rol,
          textoAceptar:"Si, registrar",
          
        };
        this.dialog.open(DialogoConfirmacionComponent,{
          disableClose: true,
          width: '500px',
          data 
        }).afterClosed().subscribe(resultado=>{
          if(resultado=="aceptar") this.registrarUsuario();

        })
    }else console.log("todo mal!!")

  }
  registrarUsuario(){
    this.UsuarioService.registrarUsuario(this.usuario).subscribe({
      next:(response:HttpResponse<any>)=> {
        if(response.status==201){
          this.snackBar.open('Usuario registrado correctamente ✅', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          
        }    
      },error:(error:HttpErrorResponse)=>{
        const mensaje = error.error?.message || 'Ocurrió un error inesperado';
        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 4000,
          panelClass: ['snackbar-error']
        });
      }
    })
  }
  personaNueva(){
    const data: NuevaPersonaData = {
      titulo: 'Registrar Persona!',
      mensaje: '¿Estás seguro de que deseas registrar a esta persona en la DB?',
      textoAceptar: 'Sí, Registrar',
      textoCancelar: 'Cancelar'
    };
    this.nuevaPersonaDialog.open(PersonaRegistrarComponent,{
      disableClose: true,
      width: '600px',
      data
    }).afterClosed().subscribe(resultado=>{
      if (resultado && resultado.apellidos) {
        this.usuario.persona=resultado;
      } else {
        console.log('Eliminación cancelada');
      }
    })
  }
  BuscarPersonaSinUsuario(){
    const data: BuscarPersonaData={
      titulo: 'Buscar Personas',
      mensaje: 'En esta lista se mostraran las personas sin registro de usuario',
      textoAceptar: 'Continuar',
      textoCancelar: 'Cancelar'
    }
    this.buscarPersonaDialog.open(PersonaBuscarComponent,{
      disableClose: true,
      width: '600px',        // Ancho fijo o puedes usar porcentajes: '80%'
      maxWidth: '90vw',      // Ocupar hasta el 90% del viewport
      minWidth: '300px',     // Mínimo ancho permitido
      height: '400px',       // Alto fijo
      maxHeight: '90vh',     // Ocupar hasta el 90% del alto del viewport
      data
    }).afterClosed().subscribe(resultado=>{
      if(resultado && resultado.apellidos){
        this.usuario.persona=resultado
      }else{
        console.log("error")
      }
      
    })
  }

}
