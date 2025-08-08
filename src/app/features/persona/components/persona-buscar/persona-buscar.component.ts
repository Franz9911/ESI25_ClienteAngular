import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../model/persona';
import { PersonaService } from '../../service/persona.service';
import { Observable } from 'rxjs';

export interface BuscarPersonaData {
  titulo: string;
  mensaje: string;
  textoAceptar?: string;
  textoCancelar?: string;
}
@Component({
  selector: 'app-persona-buscar',
  templateUrl: './persona-buscar.component.html',
  styleUrls: ['./persona-buscar.component.css']
})
export class PersonaBuscarComponent implements OnInit{
  buscarNombre:string="";
  buscarApellidos:string ="";
  personas:Persona[]=[];
  paginaActual:number=1;
  totalItems:number=1;
  datosporPagina:number=5;
  totalPaginas:number=1;
  constructor(
    public dialogRef:MatDialogRef<PersonaBuscarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data:BuscarPersonaData,
    private personaService:PersonaService,
  ) { }
    ngOnInit():void{
      this.buscarPersonaSinUsuario();
    }
  btnAceptar(p:Persona): void {
    const pers=p; 
    this.dialogRef.close(pers);
  }
  btnCancelar():void{
    this.dialogRef.close(false);
  }
  async buscarPersonaSinUsuario(){
    this.personaService.buscarPersonaSinUsuario(this.buscarNombre,this.buscarApellidos,this.paginaActual,this.datosporPagina).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.personas=response.data;
        this.totalItems=response.totalItems;
        this.paginaActual=response.currentPage;
        this.totalPaginas=Math.ceil(response.totalItems/this.datosporPagina);
        console.log(this.totalPaginas);
      }
    });
  }
  cambiarPagina(n:number){
    this.paginaActual=n;
    this.buscarPersonaSinUsuario()
  }
}
