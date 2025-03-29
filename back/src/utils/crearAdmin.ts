import { AppDataSource } from "../data-source"; 
import { Usuario } from "../entities/Usuario"; 
import bcrypt from "bcrypt";

//funcion para crear admin si no existe
export async function crearAdminSiNoExiste() {
  const repo = AppDataSource.getRepository(Usuario);
  const adminExistente = await repo.findOne({ where: { nombreUsuario: "admin" } });

  if (!adminExistente) {
    const hashed = await bcrypt.hash("admin123", 10);
    const nuevoAdmin = repo.create({
      nombreUsuario: "admin",
      contraseña: hashed,
      rol: "ADMIN",
    });

    await repo.save(nuevoAdmin);
    console.log("✅ Administrador creado con nombreUsuario 'admin' y contraseña 'admin123'");
  } else {
    console.log("ℹ️ El administrador ya existe.");
  }
}

// export por defecto si querés usarlo en otro lugar también
export default crearAdminSiNoExiste;
