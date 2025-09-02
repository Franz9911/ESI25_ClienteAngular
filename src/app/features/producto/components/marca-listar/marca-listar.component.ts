import { Component, OnInit } from '@angular/core';
import { Marca } from '../../model/marca';
import { MarcaService} from '../../service/marca.service'
import { DialogoConfirmacionData } from 'src/app/core/model/dialogo-confirmacion.data';
import { MatDialog } from '@angular/material/dialog';
import { MarcaRegistrarComponent } from '../marca-registrar/marca-registrar.component'; 
@Component({
  selector: 'app-marca-listar',
  templateUrl: './marca-listar.component.html',
  styleUrls: ['./marca-listar.component.css']
})
export class MarcaListarComponent implements OnInit {
  paginaActual:number=1;
  totalItems:number=5;
  datosporPagina:number=5;
  totalPaginas:number=1;
  marcas:Marca[]=[];
  nombre:string="";
  constructor(
    private marcaService:MarcaService,
    private marcaRegistrar:MatDialog,
  ) { }

  ngOnInit(): void {
    this.buscarMarca();
  }
  buscarMarca(){
    this.marcaService.buscarMarcas( this.nombre,this.paginaActual,this.datosporPagina).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.marcas=response.data;
        
        this.totalItems=response.totalItems;
        this.paginaActual=response.currentPage;
        // calcular el total de paginas
        this.totalPaginas=Math.ceil(response.totalItems/this.datosporPagina);
      }
    });
  }
  crearMarca(){
    const data:DialogoConfirmacionData={
      titulo:'Registrar Marca',
      mensaje:'Verifica que la informacion ingresada sea correcta.',
      textoAceptar:'Si, Aceptar',
      datos:'',
    };
    this.marcaRegistrar.open(MarcaRegistrarComponent,{
      disableClose:true,
      width:'600px',
      data
    }).afterClosed().subscribe(resultado=>{
      if(resultado){
        this.buscarMarca();
      }
    })
  }
  cambiarDatosporPagina(n:number){
    this.datosporPagina=n;
    this.paginaActual=1;
    console.log(this.datosporPagina);
    this.buscarMarca();
  }
  cambiarPagina(pagina:number){
    this.paginaActual=pagina;
    console.log("paginaActual: ",pagina);
    this.buscarMarca();
  }

}
