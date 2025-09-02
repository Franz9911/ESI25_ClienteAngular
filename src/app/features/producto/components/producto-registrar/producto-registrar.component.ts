import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../model/producto';
import { RegistrarProductoDto } from '../../model/registrar.producto.dto';
import { MarcaService} from '../../service/marca.service';
import { productoService } from '../../service/producto.service';
 
import { Marca } from '../../model/marca';
import { HttpResponse } from '@angular/common/http';
import { ValidarString } from '@validaciones/validarString';
import { ValidarNumeros } from '@validaciones/validarNumeros';
import { RespuestaValidacion } from '@validaciones/respuestaValidaciones';
import { NotificacionService } from '@validaciones/notificacion.service';
@Component({
  selector: 'app-producto-registrar',
  templateUrl: './producto-registrar.component.html',
  styleUrls: ['./producto-registrar.component.css']
})
export class ProductoRegistrarComponent implements OnInit {
  @ViewChild('imgInput') imgInput!:ElementRef<HTMLInputElement>;
  respModelo:RespuestaValidacion={validacion:true, mensaje:""};
  respMarca:RespuestaValidacion={validacion:true,mensaje:""};
  respMinUnidades:RespuestaValidacion={validacion:true,mensaje:""};
  respHabilitarVenta:RespuestaValidacion={validacion:true,mensaje:""};
  respHabilitarRefaccion:RespuestaValidacion={validacion:true, mensaje:""};

  producto:RegistrarProductoDto=new RegistrarProductoDto;

  imagenSeleccionada:string|null=null;
  archivoSeleccionado:any;
  marcas:Marca[]=[];
  n :number=1;
  mostrarLista = false;
  constructor(
    private marcaService:MarcaService,
    private productoService:productoService,
    private validarNum:ValidarNumeros,
    private validarStrings:ValidarString,
    private notificacionService:NotificacionService,
  ) { }

  ngOnInit(): void {
    //las unidades disponibles solo se deben modificar mediante los lotes.
    this.producto.unidadesDis=0; //por esto al registrar un nuevo product debe se 0.
    this.buscarMarca()
  }
  validarHabilitarVenta(){
    if(!this.producto.habilitarVenta){ 
      this.respHabilitarVenta.mensaje='Este campo es requerido para registrar el producto!';
      this.respHabilitarVenta.validacion=false;
    }else{
      this.respHabilitarVenta.mensaje='';
      this.respHabilitarVenta.validacion=true;
    } 
  }
  validarHabilitarRefaccion(){
    if(!this.producto.habilitarRefac){ 
      this.respHabilitarRefaccion.mensaje='Este campo es requerido para registrar el producto!';
      this.respHabilitarRefaccion.validacion=false;
    }else{
      this.respHabilitarRefaccion.mensaje='';
      this.respHabilitarRefaccion.validacion=true;
    } 
  }
  validarMinUnidades(){
    //this.validarNum.
  }
  validarModelo(){
    this.respModelo=this.validarStrings.VerificarLongitud(this.producto.modelo,2,40);
    this.respModelo.mensaje='El Modelo '+this.respModelo.mensaje;
  }
  validarMarca(){
    console.log("id Marca",this.producto.marcaId);
    if(!this.producto.marcaId){
      this.respMarca.mensaje="La Marca es requerida para registrar el producto!!";
      this.respMarca.validacion=false;
    }else{
      this.respMarca.mensaje="";
      this.respMarca.validacion=true;
    }
  }
  seleccionarMarca(marca: any) {
    this.producto.marcaId = marca.id;
    this.producto.marcaNombre = marca.nombre;
    this.mostrarLista = false;
  }

  ocultarLista() {
  // Delay para permitir el click antes de cerrar
    setTimeout(() => this.mostrarLista = false, 150);
  }

  //registrar en bd.
  imprimir():void{
    this.validarHabilitarRefaccion();
    this.validarHabilitarVenta();
    this.validarModelo();
    this.validarMarca();
    const { nombre } = this.marcas.find(m => m.id === +this.producto.marcaId) || {};
    console.log(nombre);
    this.producto.marcaNombre!=nombre;
    const formData=new FormData();
    formData.append('marcaNombre',nombre+"");
    formData.append('marcaId',this.producto.marcaId+"");
    formData.append('modelo',this.producto.modelo);

    formData.append('habilitarRefac',this.producto.habilitarRefac);
    formData.append('habilitarVenta',this.producto.habilitarVenta);

    formData.append('minUnidades',this.producto.minUnidades+"");
    formData.append('unidadesDis',this.producto.unidadesDis+"");

    formData.append('descripTec',this.producto.descripTec);
    if(this.archivoSeleccionado){
      formData.append('imagenPro',this.archivoSeleccionado);
    }
    this.productoService.registrarProducto(formData).subscribe({
      next:(response:HttpResponse<any>)=>{
        console.log(response);
        if(response.status===201){
          this.notificacionService.notificarExito("Producto registrado correctamente!!")
        }
      }
    }) 
  }
  //buscar arca para mostrar en el selecte de marca.
  buscarMarca(){
    console.log(this.producto.marcaNombre)
    this.marcaService.buscarMarcas(this.producto.marcaNombre,this.n,150).subscribe({
      next:(response:any)=>{
        console.log(JSON.stringify(response));
        this.marcas=response.data;
      }
    })
  }
  //abre el gestor de archivos para seleccinar una imagen.
  seleccinarImg(){
    this.imgInput.nativeElement.click();
  } 
  //coloca la imagen en pantalla para ver la imagen seleccinada. 
  //este funcion esta detallada en editar perfil.
  ImageSeleccinada(e:Event){
    const inputImagen= e.target as HTMLInputElement;
    if(!inputImagen.files?.length) return;
    if(e.target){
      this.archivoSeleccionado=inputImagen.files[0];
    }
    if (!this.archivoSeleccionado.type.startsWith('image/')) return; //si el archivo no es una imagen se termina la funcion.
      // Liberar URL anterior si existía
      if (this.imagenSeleccionada) {
        URL.revokeObjectURL(this.imagenSeleccionada);//eliminamos la url existente de la memoria.
      }     
      this.imagenSeleccionada = URL.createObjectURL(this.archivoSeleccionado);
  }

}
