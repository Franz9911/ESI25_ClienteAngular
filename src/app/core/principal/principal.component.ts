import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '@validaciones/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  nombreU:string="";
  rol:string="";
  constructor(
    private router:Router,
    private loginService:LoginService,
  ) { }

  ngOnInit(): void {
    this.nombreU = sessionStorage.getItem('uname') || '';
    this.rol=sessionStorage.getItem('u_r')||'';
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
  

}
