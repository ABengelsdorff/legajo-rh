import { DataSource } from "typeorm";
import { User } from "../entities/User"; //TypeORM mapeará esta clase a una tabla en la base de datos
import { CursoRealizado } from "../entities/CursoRealizado";
import { EvaluacionMedica } from "../entities/EvaluacionMedica";
import { GrupoFamiliar } from "../entities/GrupoFamiliar";
import { Licencia } from "../entities/Licencia";
import { Usuario } from "../entities/Usuario";
import * as path from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "../../database.sqlite"),

  synchronize: true, // Crea tablas automáticamente (desactivar para produccion)
  // compara las entidades definidas en el código con la base de datos y realiza los cambios necesarios para que coincidan
  logging: true,
  entities: [
    User,
    Usuario,
    CursoRealizado,
    EvaluacionMedica,
    GrupoFamiliar,
    Licencia,
  ],
});
