import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmacionDialogoD{
  titulo:string;
  mensaje:string;
  datos:string;
  textoAceptar?:string;
  textoAux?:string;
}

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent {

  constructor(
    public dialogoRef:MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ConfirmacionDialogoD
  ) { }

  aceptar(){
    this.dialogoRef.close("aceptar");
  }
  cancelar(){
    this.dialogoRef.close("cancel");
  }
  aux(){
    this.dialogoRef.close("aux");
  }

}
