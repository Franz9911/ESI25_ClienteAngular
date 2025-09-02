import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidarString } from '@validaciones/validarString';
import { RespuestaValidacion } from '@validaciones/respuestaValidaciones';
import { UsuarioService } from '../../service/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export interface DataMiPerfil{
  titulo:string,
  
}
@Component({
  selector: 'app-usuario-editar-miperfil',
  templateUrl: './usuario-editar-miperfil.component.html',
  styleUrls: ['./usuario-editar-miperfil.component.css',
  '../../../../shared/styles/modalStyle.css']
})
export class UsuarioEditarMiperfilComponent  {
  @ViewChild('imgInput') imgInput!: ElementRef<HTMLInputElement>;
  imagenSeleccionada: string | null = `${environment.apiUrl}`+
    (sessionStorage.getItem('fotografia') ?? `usuarios/ac-milan.avif`);
  mostrarConfirmacion=false;
  //debemos corregir las respuesta. 
  respNuevaContrasenha:RespuestaValidacion={validacion:true,mensaje:"no debe estar vacia."};
  respContrasenhaActual:RespuestaValidacion={validacion:true,mensaje:"no debe estar vacio."};
  respNombreU:RespuestaValidacion={validacion:true,mensaje:"no debe esta vacio."};
  respImagen:RespuestaValidacion={validacion:true, mensaje:"la imagen debe ser de extencion .avif"}
  respForm:RespuestaValidacion={validacion:true,mensaje:"No has ingresado ningun cambio en tu cuenta de usuario!!"};
  
  constructor(
    public modalEditarMiPerfil:MatDialogRef<UsuarioEditarMiperfilComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEditarMiPerfil:DataMiPerfil,
    private validarCamposString:ValidarString,
    private usuarioService:UsuarioService, 
  ) { }
  public nombreImagen="";
  archivoSeleccionado:any //imagen seleccionada
  public data={ //datos ingresads en el formulario
    nombreU:"",
    contrasenhaActual:"",
    nuevaContrasenha:"",
    repetirContrasenha:"",  
  };
    seleccionarImg(){ 
      //elemento oculto en el html
      this.imgInput.nativeElement.click(); //simulamos el clic en imgInput: de tipo file.
    }
    //cambiar imagen del perfil de usuario.
    ImagenSeleccionada(e:Event){
      const inputImagen = e.target as HTMLInputElement;
      if (!inputImagen.files?.length) return; //si no se selecciona un archivo terinamos la funcion.
      if(e.target){
        this.archivoSeleccionado=inputImagen.files[0];
      }
      this.nombreImagen=this.archivoSeleccionado.name;
      console.log(this.nombreImagen);
      if (!this.archivoSeleccionado.type.startsWith('image/')) return; //si el archivo no es una imagen se termina la funcion.
      // Liberar URL anterior si existía
      if (this.imagenSeleccionada) {
        URL.revokeObjectURL(this.imagenSeleccionada);//eliminamos la url existente de la memoria.
      }     
      this.imagenSeleccionada = URL.createObjectURL(this.archivoSeleccionado);//creamos una nueva url que apunta al archivo seleccionado.
    }
    // Enviamos los cambios del perfil de usuario al servidor
    //datos enviados: nombreU, nuevaContrasenha, contrasenhaActual
    aceptar():void{
      const formData=new FormData();//creamos un FormData
      formData.append('contrasenhaActual', this.data.contrasenhaActual);//agregamos los datos de data en el FormData
      formData.append('nuevaContrasenha', this.data.nuevaContrasenha);
      formData.append('nombreU', this.data.nombreU);
      
      if(this.nombreImagen){
        formData.append('fotografia',this.archivoSeleccionado);
        //console.log(formData.get('fotografia')); //ver el contenido en un campo del formData
      }
      this.usuarioService.editarMiPerfil(formData).subscribe({
        next:(response:HttpResponse<any>)=>{
          if(response.status===200){
            console.log(response);
          }
        },error(e){
          alert(JSON.stringify(e)); 
        }
      });
      this.modalEditarMiPerfil.close(true);
    }
    //cerrar el modal.
    cancelar(){
      this.modalEditarMiPerfil.close(false);
    }
    validarContrasenha(){
      if(this.data.nuevaContrasenha!==''){
        if(this.data.nuevaContrasenha===this.data.repetirContrasenha){
          this.respNuevaContrasenha=this.validarCamposString.VerificarContrasenhaFuerte(this.data.nuevaContrasenha,8,12);      
        }else{
          this.respNuevaContrasenha={validacion:false,mensaje:"la nueva contraseña y confirmar contraseña debe ser iguales."};
        } 
      }else{
        this.respNuevaContrasenha={validacion:true,mensaje:""}
        this.data.repetirContrasenha="";
      }  
    }
    validarNombreU(){
      if(this.data.nombreU!==""){
        this.respNombreU=this.validarCamposString.verificarNombreUsuario(this.data.nombreU,5,8);
      }else{
        this.respNombreU={validacion:true,mensaje:""};
      }
      
    }
    validarContrasenhaActual(){
      this.respContrasenhaActual=this.validarCamposString.VerificarContrasenhaFuerte(this.data.contrasenhaActual,8,12);
      console.log(this.respContrasenhaActual);
    }
    //antes de enviar los datos al servidor se validara que los datos sean correctos 
    validarDatosForm(){
      console.log(this.nombreImagen);
      this.validarContrasenhaActual();
      this.validarNombreU();
      this.validarContrasenha();  
      this.validarImagen(this.nombreImagen);  
      // si el formulario estan vacios se notificara al usuario del error.
      if(this.data.nombreU==="" && this.data.nuevaContrasenha==="" && this.imagenSeleccionada===`${environment.apiUrl}usuarios/ac-milan.avif` ){
        this.respForm.validacion=false; //muetra mensaje de error si el forulario esta vacio.
      }else{
        this.respForm.validacion=true; //quita el mensajes de error si el formulario estaba vacio.
        //si el forulario cuenta con los datos correctos se mostrar mensaje de confirmacion en pantalla.
        if(this.respContrasenhaActual.validacion && this.respNombreU.validacion 
          && this.respNuevaContrasenha.validacion &&this.respImagen.validacion){
          this.mensajeConfirmacion();
        }
      } 
    } 
    //validar que la imagen sea de formato .avif
    validarImagen(nombre:string){
      console.log("imagen");
      console.log(nombre);
      if(nombre!==""){
        if((/\.avif$/i).test(nombre) ){
          console.log("valido!")
          this.respImagen={mensaje:"", validacion:true}
        }else{
          console.log("invalido!");
          this.respImagen={mensaje:"la imagen debe tener la extencion .avif", validacion:false}
          
        }
      }
    }
    mensajeConfirmacion(){ //permite  abrir y cerrar el mensaje de confirmacion, siempre que los datos son valido.
      this.mostrarConfirmacion=!this.mostrarConfirmacion;
    }
}
