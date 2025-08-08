import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../service/persona.service';
import { Persona } from '../../model/persona';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { PaginadorComponent } from 'src/app/shared/components/paginador/paginador.component';
import { DataSource } from '@angular/cdk/collections';
import { PersonaRegistrarComponent, NuevaPersonaData } from '../persona-registrar/persona-registrar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-personas-listar',
  templateUrl: './personas-listar.component.html',
  styleUrls: ['./personas-listar.component.css']
})
export class PersonasListarComponent implements OnInit {
  paginaActual:number=1;
  totalItems:number=1;
  datosporPagina:number=5;
  totalPaginas:number=1;

  personas:Persona[]=[];
  isOpen:boolean=false;
  constructor(
    private personaServ:PersonaService,
    private personaRegistrar:MatDialog,
  ) { }

  ngOnInit(): void {
    this.buscar();
  }
  toggle(){
    this.isOpen=!this.isOpen;
  }
  async buscar(){
    this.personaServ.buscarPersonas(this.paginaActual,this.datosporPagina).subscribe({
      next:(response:any)=>{
        console.log(JSON.stringify(response));
        this.personas=response.data;
        this.totalItems=response.totalItems;
        this.paginaActual=response.currentPage;
        // calcular el total de paginas
        this.totalPaginas=Math.ceil(response.totalItems/this.datosporPagina);
      },error(e){
        console.log(e);
      }
    });
  }

  cambiarDatosporPagina(n:number){
    this.datosporPagina=n;
    this.paginaActual=1;
    console.log(this.datosporPagina);
    this.buscar();
  }
  cambiarPagina(pagina:number){
    this.paginaActual=pagina;
    console.log(pagina);
    this.buscar();
  }
  personaRegist():void{
    const data:NuevaPersonaData = {
      titulo: 'Registrar Persona',
      mensaje: 'Verifica la informacion ingresada antes de registrar a la persona en la DB!!',
      textoAceptar: 'Sí, registrar',
      textoCancelar: 'Cancelar'
    };
    this.personaRegistrar.open(PersonaRegistrarComponent, {
      disableClose: true,
      width: '600px',
      data
    }).afterClosed().subscribe(resultado => {
      if (resultado) {
        console.log('Usuario eliminado');
        // ejecutar lógica de eliminación
      } else {
        console.log('Eliminación cancelada');
      }
    });

  }

}
