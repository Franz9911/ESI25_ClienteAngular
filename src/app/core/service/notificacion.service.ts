import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn:'root'})
export class NotificacionService{
    constructor(
        private snackBar:MatSnackBar,
    ){}
    notificarExito(mensaje:string){
        this.snackBar.open(mensaje,'',{
            duration:5000,
            horizontalPosition:'right',
            verticalPosition:'bottom',
            panelClass:['mi_snackbar'],
        })
    }
    notificarError(mensaje:string){
        this.snackBar.open(mensaje,'',{
            duration:5000,
            horizontalPosition:'right',
            verticalPosition:'bottom',
            panelClass:['mi_snackbar_error'] 
        })
    }
}