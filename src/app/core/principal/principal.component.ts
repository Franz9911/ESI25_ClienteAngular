import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '@validaciones/login.service';
import { Router } from '@angular/router';
import { DataMiPerfil ,UsuarioEditarMiperfilComponent} from 'src/app/features/usuario/components/usuario-editar-miperfil/usuario-editar-miperfil.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  nombreU:string="";
  rol:string="";
  fotografia:string="";
  constructor(
    private dialog:MatDialog,
    private router:Router,
    private loginService:LoginService,
  ) { }

  ngOnInit(): void {
    this.nombreU = sessionStorage.getItem('uname') || '';
    this.rol=sessionStorage.getItem('u_r')||'';
    this.fotografia=`${environment.apiUrl}`+ 
      (sessionStorage.getItem('fotografia') ?? `usuarios/ac-milan.avif`); //?? significa "o"
    console.log(this.fotografia);
    //http://localhost:3000/usuarios/ac-milan.avif
  }

  cerrarSecion(id:number){
    this.loginService.cerrarSesion(id).subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.status===201){
          console.log(response);
          sessionStorage.clear();
          
          this.router.navigate(['/']);
        }
      },error:(error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }
  editarMiPerfil(){
    //this.router.navigate(['/Esi/usuario/editarMiPerfil'])
    const data:DataMiPerfil={
      titulo:"mi perfil"
    }
    this.dialog.open(UsuarioEditarMiperfilComponent,{
      disableClose:true,
      width:'500px',
      data
    })
  }
  
  

}
