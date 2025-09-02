import { Persona } from "./persona";

export interface RegistrarUsuarioDto {
    nombreU: string;
    contrasenha: string;
    rol: string;
    estado: 'Activo' | 'Inactivo';
    persona: Persona;
  }
  