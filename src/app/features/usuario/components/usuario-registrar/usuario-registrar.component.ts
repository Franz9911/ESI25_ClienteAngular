import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Persona } from '../../model/persona';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ValidarString} from 'src/app/core/service/validarString';
import { ValidarNumeros } from 'src/app/core/service/validarNumeros';
import { RespuestaValidacion } from 'src/app/core/service/respuestaValidaciones';
import { DialogoConfirmacionData } from 'src/app/core/model/dialogo-confirmacion.data';
import {DialogoConfirmacionComponent } from 'src/app/elementos-compartidos/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonaRegistrarComponent } from 'src/app/features/persona/components/persona-registrar/persona-registrar.component';
import { PersonaBuscarComponent } from 'src/app/features/persona/components/persona-buscar/persona-buscar.component';
import { RegistrarUsuarioDto } from '../../model/registra-usuario.dto';
import { modificarUsuarioDto } from '../../model/modificar-usuario.dto';
import { NotificacionService } from '@validaciones/notificacion.service';
@Component({
  selector: 'app-usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.css']
})
export class UsuarioRegistrarComponent implements OnInit {
  titulo:string="";
  modo:string="";
  persona:Persona=new Persona();

  respuestaNomUsu:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaContr:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaRol:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaCorreoE:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaPersona:RespuestaValidacion={validacion:true,mensaje:"Debe seleccionar una persona del registro!"}
  usuarioDto:RegistrarUsuarioDto={
    nombreU:"",
    estado:"Activo",
    rol:"",
    contrasenha:"",
    persona:new Persona(),
  };
  constructor(
    private dialog:MatDialog,
    private nuevaPersonaDialog:MatDialog,
    private buscarPersonaDialog:MatDialog,
    private notificacionService:NotificacionService,
    private ActRouter:ActivatedRoute,
    private UsuarioService:UsuarioService,
    private validarString: ValidarString, 
  ) { }

  ngOnInit(): void {
    const dataRuta=this.ActRouter.snapshot.data;
    //el modo se elige dependiando de por donde ingreseos a este modulo por registrar o modificar usuario.
    this.modo=dataRuta['modo'];//modo tiene dos valores: crear o editar.
    this.titulo=dataRuta['titulo'];
    if (this.modo === 'crear') {
      //console.log("creando usuario");
      // Configuración por defecto para registrar un usuario
      this.usuarioDto.persona=this.persona;
      this.usuarioDto.rol="";
      this.usuarioDto.estado="Activo"
    }else if(this.modo==='editar'){
      //console.log("editanto usuario!!");
      //configuaracion por defecto para modificar un usuario.
      this.usuarioDto.persona = this.persona;
      console.log(history.state);//history es mandando desde el router desde UI lista de usuarios.
      const usuarioSeleccinado= history.state.usuario;
      if(history.state.usuario){
        this.usuarioDto=usuarioSeleccinado;
      }else if(!this.usuarioDto.nombreU){
        const id = this.ActRouter.snapshot.params['id'];
        this.buscarUsuarioId(id);
      } 
    }
  }
//buscar usuario para editar en caso de recargar la pantalla
  buscarUsuarioId(id:string ){
    console.log("buscandote editado");
    (this.UsuarioService.buscarUsuarioPorId(id)).subscribe({
      next:(response:any)=>{
        const u=response.body;
        console.log(u
          );
        this.usuarioDto=u;
      }
    });
  }
  validarNomUsuario(){
    console.log(this.usuarioDto.nombreU);
    this.respuestaNomUsu= this.validarString.verificarNombreUsuario(this.usuarioDto.nombreU,5,12);
  }
  validarContrasenhaSegura(){
    this.respuestaContr=this.validarString.VerificarContrasenhaFuerte(this.usuarioDto.contrasenha,8,12);
  }
  validarRol(){
    switch(this.usuarioDto.rol){
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

  validarDatosPersonales(){  
    if(!this.usuarioDto.persona.nombre){
      console.log(this.usuarioDto.persona.nombre);
      this.respuestaPersona.validacion=false;
    }else{
      this.respuestaPersona.validacion=true;
    }
  }

  procesar():void{
    this.validarRol();
    this.validarDatosPersonales();
    if(this.modo==="crear"){
      this.validarContrasenhaSegura();
      this.validarNomUsuario();
    }
    //console.log(this.modo);
    if(this.respuestaNomUsu.validacion && this.respuestaContr.validacion && this.respuestaRol.validacion &&
       this.respuestaCorreoE.validacion){
        console.log("todo bien!!");
        const data:DialogoConfirmacionData={
          titulo:"Registrar Usuario",
          mensaje:"Confirme el registro",
          datos:"nombre: "+this.usuarioDto.persona.nombre+" "+this.usuarioDto.persona.apellidos+"\n "+this.usuarioDto.persona.tipoDoc+" : "+this.usuarioDto.persona.numDoc+
          "\n nombre de usuario: "+ this.usuarioDto.nombreU+ "\n rol: "+ this.usuarioDto.rol,
          textoAceptar:"Si, registrar",
        };
        //si vamos a modificar el usuario entonces se cambiara el titulo del modal de confirmacion.
        if(this.modo==="editar"){
          data.titulo="Actualizar Usuario";
          data.textoAceptar="Si, Actualizar";
        }
        this.dialog.open(DialogoConfirmacionComponent,{
          disableClose: true,
          width: '500px',
          data 
        }).afterClosed().subscribe(resultado=>{
          if(resultado=="aceptar" && this.modo==="crear") this.registrarUsuario();
          if(resultado=="aceptar" && this.modo==="editar"){
            this.modificarUsuarioAdmin();
            console.log("vas a editar");
          }
        })
    }else {
      console.log("todo mal!!");
      console.log(this.usuarioDto);
    }
  }
  registrarUsuario(){
    this.UsuarioService.registrarUsuario(this.usuarioDto).subscribe({
      next:(response:HttpResponse<RegistrarUsuarioDto>)=> {
        if(response.status==201){
          this.notificacionService.notificarExito('Usuario registrado correctamente')  
        }    
      }
    })
  }
  
  modificarUsuarioAdmin(){
    console.log("en el editar user");
    const u:modificarUsuarioDto ={
      estado:this.usuarioDto.estado,
      rol:this.usuarioDto.rol
    }
    const id=this.ActRouter.snapshot.params['id'];
    this.UsuarioService.modificarUsuarioAdmin(u,id).subscribe({
      next:(response:HttpResponse<modificarUsuarioDto>)=>{
        if(response.status===200){
          console.log(response);
          this.notificacionService.notificarExito('Usuario modificado correctamente');
        }
      }
    })
  }
  personaNueva(){
    const data: DialogoConfirmacionData = {
      titulo: 'Registrar Persona!',
      mensaje: '¿Estás seguro de que deseas registrar a esta persona en la DB?',
      textoAceptar: 'Sí, Registrar',
      datos:"",
    };
    this.nuevaPersonaDialog.open(PersonaRegistrarComponent,{
      disableClose: true,
      width: '600px',
      data
    }).afterClosed().subscribe(resultado=>{
      if (resultado && resultado.apellidos) {
        this.usuarioDto.persona=resultado;
      } else {
        console.log('Eliminación cancelada');
      }
    })
  }
  BuscarPersonaSinUsuario(){
    const data: DialogoConfirmacionData={
      titulo: 'Buscar Personas',
      mensaje: 'En esta lista se mostraran las personas sin registro de usuario',
      textoAceptar: 'Continuar',
      datos:''
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
        this.usuarioDto.persona=resultado;
        //this.usuario.persona=resultado;
      }else{
        console.log("error")
      }
      
    })
  }

}
