import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidarString } from '@validaciones/validarString';
import { DialogoConfirmacionData } from 'src/app/core/model/dialogo-confirmacion.data';
import { MarcaService } from '../../service/marca.service';
import { Router } from '@angular/router';
import { RespuestaValidacion } from '@validaciones/respuestaValidaciones';
import { HttpResponse } from '@angular/common/http';
import { NotificacionService } from '@validaciones/notificacion.service';
@Component({
  selector: 'app-marca-registrar',
  templateUrl: './marca-registrar.component.html',
  styleUrls: ['./marca-registrar.component.css',
    '../../../../shared/styles/modalStyle.css'
  ]
})
export class MarcaRegistrarComponent  {
  nombre:string="";
  respuestaNom:RespuestaValidacion={validacion:true,mensaje:""};
  constructor(
    public dialogRef:MatDialogRef<MarcaRegistrarComponent>,
    @Inject(MAT_DIALOG_DATA)public data:DialogoConfirmacionData,
    private validarString:ValidarString,
    private marcaService:MarcaService,
    private notificacionService:NotificacionService,
    private router:Router,
  ) { }

  validarNombre(){
    this.respuestaNom= this.validarString.verificarNombreUsuario(this.nombre,2,40);
    this.respuestaNom.mensaje="El nombre "+this.respuestaNom.mensaje;
  }
  aceptar():void{
    this.validarNombre();
    if(this.respuestaNom.validacion){
      this.marcaService.registrarMarca(this.nombre).subscribe({
        next:(response:HttpResponse<any>)=>{
          console.log(response);
          if(response.status===201){
            console.log("teneos que cerrar")
            this.notificacionService.notificarExito('Marca correcataente Registrada!!')
            this.dialogRef.close(true);    
          }
        }
      })
    }
  }

  Cancelar(): void {
    this.dialogRef.close(false);
  }
}
