import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "@validaciones/login.service";
import { Observable, catchError, switchMap, throwError } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private autenticacionServ:LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clone = req.clone({
          withCredentials: true,
        });     
        return next.handle(clone);
      }   
}