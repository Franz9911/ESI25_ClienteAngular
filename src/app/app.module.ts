import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './core/principal/principal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';

import { DialogoConfirmacionComponent } from './elementos-compartidos/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LoginComponent } from './core/login/login.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { InterceptorError } from './core/interceptors/interceptorError';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    DialogoConfirmacionComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true,
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorError,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
