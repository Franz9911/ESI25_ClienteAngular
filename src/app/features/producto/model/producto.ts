import { Marca } from "./marca";

export class Producto{
    id!:number;
    modelo!:string;
    minUnidades!:number;
    unidadesDis!:number;
    descripTec!:string;
    habilitarVenta!:string;
    habilitarRefac!:string;
    imagenProd!:string;
    codigoSIM!:number;
    marca!:Marca;

}