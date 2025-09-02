export class RegistrarProductoDto{
    marcaId!:number;
    marcaNombre!:string;
 
    modelo!:string;
    minUnidades!:number;
    unidadesDis!:number;
    descripTec!:string;
    habilitarVenta!:'si'|  'no';
    habilitarRefac!:string;
    //imagenProd:string;
    codigoSIM!:number;
}