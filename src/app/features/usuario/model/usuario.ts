import { Persona } from "./persona";

export class Usuario{
    id!:number;
    nombreU!: string;
    contrasenha!:string;
    rol!:string;
    estado!:string;
    correo!:string;
    fechaReg!:Date;
    persona!:Persona;
}