import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListarComponent } from './components/usuario-listar/usuario-listar.component';
import { UsuarioRegistrarComponent } from './components/usuario-registrar/usuario-registrar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonaModule } from '../persona/persona.module';
@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListarComponent,
    UsuarioRegistrarComponent
  ],
  imports: [
    CommonModule, 
    UsuarioRoutingModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    SharedModule,
    PersonaModule
  ]
})
export class UsuarioModule { }
