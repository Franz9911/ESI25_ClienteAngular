import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../model/persona';
import { RespuestaValidacion } from 'src/app/core/service/respuestaValidaciones';
import { ValidarString } from 'src/app/core/service/validarString';
import { ValidarNumeros } from 'src/app/core/service/validarNumeros';
import { PersonaService } from '../../service/persona.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotificacionService} from 'src/app/core/service/notificacion.service';
import { Router } from '@angular/router';
import { DialogoConfirmacionData } from 'src/app/core/model/dialogo-confirmacion.data';

@Component({
  selector: 'app-persona-registrar',
  templateUrl: './persona-registrar.component.html',
  styleUrls: ['./persona-registrar.component.css',
    '../../../../shared/styles/modalStyle.css']
})
export class PersonaRegistrarComponent {
  persona=new Persona();
  respuestaNom:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaApe:RespuestaValidacion={validacion:true,mensaje:""};  
  respuestaDir:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaCel:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaDoc:RespuestaValidacion={validacion:true,mensaje:""};
  respuestaCorreoE:RespuestaValidacion={validacion:true,mensaje:""};
  constructor(
    public dialogRef:MatDialogRef<PersonaRegistrarComponent>,
    @Inject(MAT_DIALOG_DATA)public data:DialogoConfirmacionData,
    private validarString:ValidarString,
    private validarNumeros:ValidarNumeros,
    private personaService: PersonaService, 
    private notificacionService:NotificacionService,
    private router: Router,
  ) { }
    
  validarNombre(){
    this.respuestaNom= this.validarString.verificarNombresApellidos(this.persona.nombre,3,40);
    this.respuestaNom.mensaje="El nombre "+this.respuestaNom.mensaje;
  }
  validarApellido(){
    this.respuestaApe=this.validarString.verificarNombresApellidos(this.persona.apellidos,3,40);
    this.respuestaApe.mensaje="El apellido "+this.respuestaApe.mensaje;
  }
  validarDireccion(){
    this.respuestaDir=this.validarString.VerificarDirecciones(this.persona.direccion,3,60)
  }
  validarCelular(){
    this.respuestaCel=this.validarNumeros.verificarNumeroTelefono(this.persona.celular+"")
  }
  validarDocumento(){
    this.respuestaDoc=this.validarNumeros.verficartipoDoc(this.persona.numDoc+"",this.persona.tipoDoc);
  }
  validarCorreoE(){
    if(this.persona.correoE)
    this.respuestaCorreoE=this.validarString.VerificarCorreos(this.persona.correoE,5,30);
  }
  onAceptar(): void {
 
    this.validarNombre();
    this.validarApellido();
    this.validarCelular();
    this.validarDireccion();
    this.validarCelular();
    this.validarDocumento();
    this.validarCorreoE();
    if(this.respuestaDoc.validacion && this.respuestaDir.validacion && this.respuestaCel.validacion &&
      this.respuestaApe.validacion && this.respuestaNom.validacion){
        //this.persona.id=0;
        this.personaService.registrarPersona(this.persona).subscribe({         
          next:(response:HttpResponse<any>) =>{
            console.log('next');
            console.log(response.status);
            if(response.status==201){
              console.log(response);
              this.notificacionService.notificarExito('Persona correctamente Registrada!!');
              this.dialogRef.close(response.body);
              this.router.navigateByUrl('/Esi/persona/listar')
            }  
          }
        });
    }
  }

  onCancelar(): void {
    this.dialogRef.close(false);
  }
}
