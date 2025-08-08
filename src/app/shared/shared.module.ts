import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginadorComponent } from './components/paginador/paginador.component';



@NgModule({
  declarations: [
    PaginadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    PaginadorComponent
  ]
})
export class SharedModule { }
