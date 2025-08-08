import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListarComponent } from './components/usuario-listar/usuario-listar.component';
import { UsuarioRegistrarComponent } from './components/usuario-registrar/usuario-registrar.component';

const routes: Routes = [
  { path: 'listar', component: UsuarioListarComponent },
  { path: 'registrar', component: UsuarioRegistrarComponent },
  { path: '', redirectTo: 'listar', pathMatch: 'full' }, // Redirección por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
