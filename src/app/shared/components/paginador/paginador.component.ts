import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent  { 
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1; //pagina actual
  @Input() totalItems: number = 0;
  @Input() totalPages: number =1;

  @Output() pageChange = new EventEmitter<any>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  paginaAux!:number;
  cambiarPagina(pagina: number) {
    this.pageChange.emit(pagina);
    console.log("total paginas")
        //console.log(this.totalPages);
  }

  cambiarDatosporPagina() {
    this.itemsPerPage=this.itemsPerPage*1;
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }
  irAPagina(){
    if(this.paginaAux){
      this.cambiarPagina(this.paginaAux);
      console.log(this.paginaAux);
    }
    
  }
}
