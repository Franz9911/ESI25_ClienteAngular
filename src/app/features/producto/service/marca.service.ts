import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})
export class MarcaService{
    constructor(
        private httpMarca:HttpClient
    ){}
    public buscarMarcas(nombre:any,page:number,limit:number):Observable<any[]>{
        const marcas=this.httpMarca.get<any[]>(`${environment.apiUrl}marca/buscarMarcas?nombre=${nombre}&page=${page}&limit=${limit}`)
        return marcas;
    }
    public registrarMarca(nombre:string){
        console.log("en el service con:" ,nombre );
        return this.httpMarca.post<any>(`${environment.apiUrl}marca/registrarMarca`,{nombre},{
            observe:'response'
        })
    }
}