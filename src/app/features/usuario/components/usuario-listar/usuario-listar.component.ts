import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
// en el componente donde generarás el PDF
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Table } from 'jspdf-autotable';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogoD, DialogoConfirmacionComponent } from 'src/app/elementos-compartidos/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
(pdfMake as any).vfs = pdfFonts.vfs;

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {

  
  usuarios:Usuario[]=[];
  contenido:string="";
  isOpen:boolean=false;
  
  nombre?:string|null;
  apellidos?:string;
  fechaInicio?:Date;
  fechaFin?:Date;
  estado?:string;
  rol?:string;

  paginaActual:number=1;
  totalItems:number=1;
  datosporPagina:number=5;
  totalPaginas:number=1;

  //tabla
  displayedColumns: String[]=['Nombre','apellidos','nombreU','rol', 'numDoc', 'tipoDoc',  'estado','fechaReg','acciones']; 
  dataSource=new MatTableDataSource<Usuario>();
  constructor(
    private usuarioServ:UsuarioService,
    private dialog:MatDialog,
  ) { }
  ngOnInit(): void {
    this.buscar();
  }

  
  ConfirmaEliminarUsuario(u:any):void{
    const data :ConfirmacionDialogoD={
      titulo:"Eliminar usuario",
      mensaje:"Esta seguro de eliminar el registro?",
      datos:"nombre: "+u.persona.nombre+" "+u.persona.apellidos+"\n "+u.persona.tipoDoc+" : "+u.persona.numDoc+
      "\n nombre de usuario: "+ u.nombreU+ "\n rol: "+ u.rol,
      textoAceptar:"Eliminar usuario",
      textoAux:"Eliminar persona y usuario"
    };
    this.dialog.open(DialogoConfirmacionComponent,{
      width:'600px',data
    }).afterClosed().subscribe(resultado=>{
      console.log(resultado);
      if(resultado=="aux"){this.eliminarUsuario(u.id,u.persona.numDoc,0)}
      if(resultado=="aceptar") this.eliminarUsuario(u.id,u.persona.numDoc,u.persona.id)

      else console.log("cancelado!!!");
    })
  }

  eliminarUsuario(id:number,ci:number,personaId:number) {
    this.usuarioServ.EliminarUsuario(id,ci,personaId).subscribe({
      next: () => {
        console.log('Usuario eliminado correctamente');
        // Aquí actualiza la lista o la UI según corresponda
        this.dataSource.data=this.dataSource.data.filter(usua => usua.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }   

  toggle(){
    this.isOpen=!this.isOpen;
  }

  ExportarPdf(){
    console.log("tratando de imprimir");
    
    const content: any[] = [];

    // Encabezados de la tabla
const tablaCuerpo: any[] = [
  [
    { text: "Nombre", style: "tableHeader" },
    { text: "Apellidos", style: "tableHeader" },
    { text: "Documento", style: "tableHeader" },
    { text: "Tipo", style: "tableHeader" },
    { text: "Usuario", style: "tableHeader" },
    { text: "Rol", style: "tableHeader"},
    { text: "Estado", style: "tableHeader" },
    { text: "Fecha de registro", style: "tableHeader" },
  ],
];

// Agrega los datos de usuarios
this.dataSource.data.forEach((us) => {
  if (us) {
    tablaCuerpo.push([
      us.persona?.nombre || '',
      us.persona?.apellidos || '',
      us.persona?.numDoc || '',
      us.persona?.tipoDoc || '',
      us.nombreU || '',
      us.rol || '',
      us.estado || '',
      us.fechaReg || ''
    ]);
  }
});
    console.log(tablaCuerpo);
    content.push({ text: "\n" });


    content.push({
      table: {
        headerRows: 1,
        widths: ["auto", "auto","auto", "auto", "auto", "auto","auto","auto"],
        body: tablaCuerpo,
      },
      layout: "lightHorizontalLines",
      margin: [0, 10, 0, 10],
      
    });
    console.log(content);
    const styles = {
      header: {
        fontSize: 14,
        bold: true,
      },
      subheader: {
        fontSize: 12,
        margin: [0, 5, 0, 5],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: "black",
      },
      total: {
        fontSize: 12,
        bold: true,
      },
    };
  
  
    const docDefinition: any = {
      content,
      styles,
    };
  
    try{
      pdfMake.createPdf(docDefinition).open();
    }catch(e){
      throw (
        console.log(e)
      )
      
    }
    

  }
  async exportarExcel(){
    console.log("tratando de exportar excel");
    const workbook= new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('usuarios');
    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 20 },
      { header: 'Apellido', key: 'apellido', width: 20 },
      { header: 'Documento', key: 'documento', width: 15 },
      { header: 'Tipo', key: 'tipo', width: 10 },
      { header: 'Fecha de Registro', key: 'fechaRegistro', width: 20 },
      { header: 'Usuario', key: 'usuario', width: 20 },
      { header: 'Estado', key: 'estado', width: 10 }
    ];

    const listaPersonaExcel=this.dataSource.data.map(usuarioAux=>({
      nombre:usuarioAux.persona?.nombre || "",
      apellido:usuarioAux.persona?.apellidos || "",
      documento:usuarioAux.persona?.numDoc || "",
      tipo:usuarioAux.persona?.tipoDoc || "",
      fechaRegistro:usuarioAux.fechaReg,
      usuario:usuarioAux.nombreU,
      estado:usuarioAux.estado,   
    }))
    worksheet.addRows(listaPersonaExcel);
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      FileSaver.saveAs(blob, 'usuarios.xlsx');
    }).catch(err => {
      console.error('Error al exportar Excel:', err);
    });
  }

  async buscar(){
    console.log("buscandote")
    this.usuarioServ.buscarU({
      "fechaInicio":this.fechaInicio,"fechaFin":this.fechaFin,"nombre":this.nombre,
      "apellidos":this.apellidos, "estado":this.estado,"rol":this.rol,"page":this.paginaActual,"limit":this.datosporPagina}).subscribe({
      next:(response:any)=>{
        console.log(JSON.stringify(response));
        this.usuarios=response.data;
        this.totalItems=response.totalItems;
        this.paginaActual=response.currentPage;
        this.dataSource.data=this.usuarios;
        this.totalPaginas=Math.ceil(response.totalItems/this.datosporPagina);
        console.log(this.dataSource.data);
      }
    })
  }

  cambiarPagina(pagina:number){
    this.paginaActual=pagina;
    console.log(pagina);
    this.buscar();
  }
  cambiarDatosporPagina(n:number){
    this.datosporPagina=n;
    console.log("valor n");
    console.log(n);
    this.paginaActual=1;
    console.log(this.datosporPagina);
    this.buscar();
  }

}
