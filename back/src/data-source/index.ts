import { DataSource } from "typeorm";
import { User } from "../entities/User"; //TypeORM mapeará esta clase a una tabla en la base de datos
import { GrupoFamiliar } from "../entities/GrupoFamiliar";
import { Actuacion } from "../entities/Actuacion";
import { JuntaMedica } from "../entities/JuntaMedica";
import { Solicitud } from "../entities/Solicitud";
import { ParteDeEnfermo } from "../entities/ParteDeEnfermo"; 
import { AptitudPsicofisica } from "../entities/AptitudPsicofisica";
import { CursoRealizado } from "../entities/CursoRealizado";
import { Usuario } from "../entities/Usuario";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true, // Crea tablas automáticamente (desactivar para produccion)  
  // compara las entidades definidas en el código con la base de datos y realiza los cambios necesarios para que coincidan
  logging: true,
  entities: [ User, Usuario, 
    GrupoFamiliar,
    Actuacion,
    JuntaMedica,
    Solicitud,
    ParteDeEnfermo,
    AptitudPsicofisica,
    CursoRealizado], 
});
 