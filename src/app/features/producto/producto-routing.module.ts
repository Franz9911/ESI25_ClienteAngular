import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { MarcaListarComponent } from './components/marca-listar/marca-listar.component';
import { ProductoRegistrarComponent } from './components/producto-registrar/producto-registrar.component';
import { ProductoListarComponent } from './components/producto-listar/producto-listar.component';

const routes: Routes = [
  { path: 'marca/listar', component: MarcaListarComponent },
  { path: 'registrar', component: ProductoRegistrarComponent},
  { path: 'listar', component:ProductoListarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
