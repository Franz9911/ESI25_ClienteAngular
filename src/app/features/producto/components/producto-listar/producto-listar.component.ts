import { Component, OnInit } from '@angular/core';
import { productoService } from '../../service/producto.service';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css']
})
export class ProductoListarComponent implements OnInit {
  productos:any;
  totalItems:number=1;
  paginaActual:number=1;
  totalPaginas:number=1
  datosporPagina:number =15;
  constructor(
    private productoService: productoService,
  ) { }

  ngOnInit(): void {
    this.buscarProductos()
  }

  async buscarProductos(){
    this.productoService.buscarProductos(this.paginaActual,this.datosporPagina).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.productos=response.data;
        this.totalItems=response.totalItems;
        this.paginaActual=response.currentPage;
        // calcular el total de paginas
        this.totalPaginas=Math.ceil(response.totalItems/this.datosporPagina);
      }
    });
  }
}
