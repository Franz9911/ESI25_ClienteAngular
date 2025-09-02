import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Producto } from "../model/producto";

@Injectable({
    providedIn:'root'
})
export class productoService{
    constructor(
        private httProducto:HttpClient,
    ){}
    public registrarProducto(formData:FormData){
        return this.httProducto.post<any>(`${environment.apiUrl}producto/registrarProducto`,formData,{
            observe:'response'
        })
    }
     public buscarProductos(pagina:number,numItems:number):Observable<Producto[]>{
        return this.httProducto.get<Producto[]>(`${environment.apiUrl}producto/buscarProductos?&page=${pagina}&limit=${numItems}`)
     }
}