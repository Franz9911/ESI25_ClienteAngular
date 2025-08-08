import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './core/principal/principal.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent,
    children:[]
  },
  { path:'Esi', component:PrincipalComponent,
    children:[
      { path: 'usuario',loadChildren: () =>
        import('./features/usuario/usuario.module').then(m => m.UsuarioModule),},
      { path: 'persona', loadChildren: () => 
        import('./features/persona/persona.module').then(m => m.PersonaModule) },
     
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

