import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';
import { MarcaListarComponent } from './components/marca-listar/marca-listar.component';
import { MarcaRegistrarComponent } from './components/marca-registrar/marca-registrar.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductoRegistrarComponent } from './components/producto-registrar/producto-registrar.component';
import { ProductoListarComponent } from './components/producto-listar/producto-listar.component';


@NgModule({
  declarations: [
    ProductoComponent,
    MarcaListarComponent,
    MarcaRegistrarComponent,
    ProductoRegistrarComponent,
    ProductoListarComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatDialogModule,
    FormsModule,
    SharedModule
  ],
  exports:[MarcaListarComponent]
})
export class ProductoModule { }
