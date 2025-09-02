
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { NotificacionService } from "src/app/core/service/notificacion.service"
//un interceptor debe ser registrado en el app.component
//un interceptor es una especie de filtro revisa las peticiones antes de enviarlas al servidor para:
//modificar la cabecera, agregar jwt, cabiar la ruta, mostrar loader.
//Tambien se encarga de revisar y procesar las respuestas antes de que lleguen al servicio que hizo la llamada. Para:
//agregar logica, mostrar errores de fora global, cultar datos, transforar datos. 
@Injectable({
    providedIn:'root'
})
export class InterceptorError{
    constructor(
        private notificacionService:NotificacionService,
        private router:Router,
    ){}
    //metodo principal de la interfaz HttpInterceptor.
    intercept(req:HttpRequest<any>, next:HttpHandler,):Observable<HttpEvent<any>>{
        console.log("interceptando error");
        //next.handle(req) mandara la peticion al siguiente interceptor, si ya no hay mas interceptores se envia al backend.
        return next.handle(req).pipe( 
            catchError((error:HttpErrorResponse)=>{//pipe(catchError) intercepta el error para procesarlo.
                let mensaje:string=error.error?.error ;
                //console.log(error.error.error);
                if(error.status=== 0){
                    mensaje='No hay conexion con el servidor.';
                } 
                
                if(mensaje.length<=0){
                    if(error.status===401 ){
                        mensaje='No autorizado, inicie session';
                        //this.router.navigate([`/`]);
                    }else if(error.status===409){
                        mensaje='Ocurrio un error inesperado';
                    }
                }
                
                
                this.notificacionService.notificarError(mensaje);
                return throwError(()=>error) //el error es lanzdo otra ves "solo por si es necesario en el caponente que hizo la llamada".  
            })  
        );
    }
}