import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './persona.component';
import { PersonasListarComponent } from './components/personas-listar/personas-listar.component';

const routes: Routes = [
  {path:'listar',component:PersonasListarComponent},
  {path: '', redirectTo: 'listar',pathMatch: 'full'  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
