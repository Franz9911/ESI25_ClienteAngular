import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonaRoutingModule } from './persona-routing.module';
import { PersonaComponent } from './persona.component';
import { PersonasListarComponent } from './components/personas-listar/personas-listar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonaRegistrarComponent } from './components/persona-registrar/persona-registrar.component';
import { PersonaBuscarComponent } from './components/persona-buscar/persona-buscar.component';
@NgModule({
  declarations: [
    PersonaComponent,
    PersonasListarComponent,
    PersonaRegistrarComponent,
    PersonaBuscarComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    SharedModule
  ],
  exports:[PersonaRegistrarComponent]
})
export class PersonaModule { }
