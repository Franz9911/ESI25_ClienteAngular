import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../model/persona';
import { RespuestaValidacion } from 'src/app/core/service/respuestaValidaciones';
import { ValidarString } from 'src/app/core/service/validarString';
import { ValidarNumeros } from 'src/app/core/service/validarNumeros';
import { PersonaService } from '../../service/persona.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NuevaPersonaData {
  titulo: string;
  mensaje: string;
  textoAceptar?: string;
  textoCancelar?: string;
}

@Component({
  selector: 'app-persona-registrar',
  templateUrl: './persona-registrar.component.html',
  styleUrls: ['./persona-registrar.component.css']
})
export class PersonaRegistrarComponent {
  persona=new Persona();
  respuestaNom:RespuestaValidacion={validacion:false,mensaje:" no debe estar vacio"};
  respuestaApe:RespuestaValidacion={validacion:false,mensaje:" no debe estar vacio"};  
  respuestaDir:RespuestaValidacion={validacion:false,mensaje:"no debe estar vacia"};
  respuestaCel:RespuestaValidacion={validacion:false,mensaje:"no debe estar vacio"};
  respuestaDoc:RespuestaValidacion={validacion:false,mensaje:"no debe esta vacio "}
  constructor(
    public dialogRef:MatDialogRef<PersonaRegistrarComponent>,
    @Inject(MAT_DIALOG_DATA)public data:NuevaPersonaData,
    private validarString:ValidarString,
    private validarNumeros:ValidarNumeros,
    private personaService: PersonaService, 
    private snackbar: MatSnackBar,
  ) { }
    
  validarNombre(){
   this.respuestaNom= this.validarString.nombresConEspacio(this.persona.nombre,3,40);
  }
  validarApellido(){
    this.respuestaApe=this.validarString.nombresConEspacio(this.persona.apellidos,3,40);
  }
  validarDireccion(){
    this.respuestaDir=this.validarString.validarDireccion(this.persona.direccion,3,60)
  }
  validarCelular(){
    this.respuestaCel=this.validarNumeros.numeroTelefono(this.persona.celular.toString())
  }
  validarDocumento(){
    switch(this.persona.tipoDoc){
      case "ci":{
        this.respuestaDoc=this.validarNumeros.numeroCI(this.persona.numDoc.toString());
        break;
      }
      case "nit":{
        this.respuestaDoc=this.validarNumeros.numeroNIT(this.persona.numDoc.toString());
        break;
      }
      default:{
        this.respuestaDoc.mensaje="debe seleccionar el tipo de documento"
      } 
    }
  }
  onAceptar(): void {
    if(this.respuestaDoc.validacion && this.respuestaDir.validacion && this.respuestaCel.validacion &&
      this.respuestaApe.validacion && this.respuestaNom.validacion){
        this.persona.id=0;
        this.snackbar.open
        this.personaService.registrarPersona(this.persona).subscribe({
          
          next:(response:HttpResponse<any>) =>{
            if(response.status==201){
              console.log(response);
              this.snackbar.open('Persona registrada correctamente ✅', 'Cerrar', {
                duration: 3000,
                panelClass: ['snackbar-success']
              });
              this.dialogRef.close(response.body);
            }
              
          },error:(error:HttpErrorResponse) =>{
            const mensaje = error.error?.message || 'Ocurrió un error inesperado';
            this.snackbar.open(mensaje, 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          },
        })
      }
  }

  onCancelar(): void {
    this.dialogRef.close(false);
  }

}
