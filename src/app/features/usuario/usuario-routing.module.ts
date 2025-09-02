import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListarComponent } from './components/usuario-listar/usuario-listar.component';
import { UsuarioRegistrarComponent } from './components/usuario-registrar/usuario-registrar.component';
import { UsuarioEditarMiperfilComponent } from './components/usuario-editar-miperfil/usuario-editar-miperfil.component';

const routes: Routes = [
  { path: 'listar', component: UsuarioListarComponent },
  //{ path: 'registrar', component: UsuarioRegistrarComponent },
  { path: 'registrar', component: UsuarioRegistrarComponent,
      data: {
        modo: 'crear',
        titulo: 'Registrar Usuario'
  }},
  { path: 'editar/:id', component: UsuarioRegistrarComponent,
      data: {
        modo: 'editar',
        titulo: 'Modificar Usuario'
  }},

  { path: '', redirectTo: 'listar', pathMatch: 'full' }, // Redirección por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
