import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { ILike } from "typeorm";
import { In } from "typeorm";
import { quitarTildes } from "../utils/removeAccents";
import * as XLSX from "xlsx";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      relations: [
        "cursosRealizados",
        "evaluacionesMedicas",
        "grupoFamiliar",
        "licencias"
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: [
        "cursosRealizados",
        "evaluacionesMedicas",
        "grupoFamiliar",
        "licencias"
      ],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, ...userData } = req.body;

    // Crear el usuario incluyendo las relaciones
    const newUser = userRepository.create({
      ...userData,
      cursosRealizados: userData.cursosRealizados || [],
      evaluacionesMedicas: userData.evaluacionesMedicas || [],
      grupoFamiliar: userData.grupoFamiliar || [],
      licencias: userData.licencias || [],
    });
    

    const result = await userRepository.save(newUser);

    console.log("📩 Datos recibidos:", req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    res
      .status(500)
      .json({ error: "Error al crear el usuario", detalles: error });
  }
};

// Actualizar un usuario por ID

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (user) {
      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      res.json(result);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const user = await userRepository.findOneBy({ id: userId });

//     if (user) {
//       const result = await userRepository.delete(userId);
//       if (result.affected) {
//         res.json({ message: 'Usuario eliminado' });
//       } else {
//         res.status(404).json({ message: 'Usuario no encontrado' });
//       }
//     } else {
//       res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el usuario' });
//   }
// };


// Obtener usuario por DNI
export const getUserByDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const users = await userRepository.find({
      where: { numeroDeDni: ILike(`%${dni}%`) },
      relations: [
        "cursosRealizados",
        "evaluacionesMedicas",
        "grupoFamiliar",
        "licencias"
      ],
    });
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Obtener usuario por apellido
export const getUserByApellido = async (req: Request, res: Response) => {
  try {
    const { apellido } = req.params;
    const apellidoNormalizado = quitarTildes(apellido.toLowerCase());

    // Obtener todos los usuarios (con relaciones necesarias)
    const allUsers = await userRepository.find({
      relations: [
        "cursosRealizados",
        "evaluacionesMedicas",
        "grupoFamiliar",
        "licencias"
      ],
    });

    // Filtrar comparando sin tildes
    const filtered = allUsers.filter((user) =>
      quitarTildes(user.apellido.toLowerCase()).includes(apellidoNormalizado)
    );

    if (filtered.length > 0) {
      res.json(filtered);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Obtener usuario por cargo
export const getUserByCargo = async (req: Request, res: Response) => {
  try {
    const { cargo } = req.params;
    const users = await userRepository.find({
      where: { cargo: ILike(`%${cargo}%`) },
      relations: [
        "cursosRealizados",
        "evaluacionesMedicas",
        "grupoFamiliar",
        "licencias"
      ],
    });
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Obtener usuario por curso
export const getUserByCurso = async (req: Request, res: Response) => {
  try {
    const { curso } = req.params;

    // Obtener usuarios que tienen un curso que coincida
    const usuariosConCurso = await userRepository
      .createQueryBuilder("user")
      .leftJoin("user.cursosRealizados", "curso")
      .where("LOWER(curso.nombre) LIKE :nombre", {
        nombre: `%${curso.toLowerCase()}%`,
      })
      .select(["user.id"])
      .getMany();

    const ids = usuariosConCurso.map((u) => u.id);

    // Traer usuarios completos por ID, con TODAS las relaciones
    const users = await userRepository.find({
      where: { id: In(ids) },
      relations: [
        "cursosRealizados",
        "evaluacionesMedicas",
        "grupoFamiliar",
        "licencias"
      ],
    });

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en getUserByCurso:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

//Funcion para exportar usuarios a Excel
// Se utiliza la libreria xlsx para crear el archivo Excel

export const exportarUsuariosExcel = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const usuarios = await userRepository.find({
      relations: {
        cursosRealizados: true,
        evaluacionesMedicas: true,
        grupoFamiliar: true,
        licencias: true,
      },
    });

    const data = usuarios.map((u) => ({
      NOMBRE: u.nombre,
      APELLIDO: u.apellido,
      SEXO: u.sexo,
      FECHA_DE_NACIMIENTO: u.fechaDeNacimiento,
      GRUPO_SANGUINEO: u.grupoSanguineo,
      DNI: u.numeroDeDni,
      CUIL: u.numeroDeCuil,
      DIRECCION: u.direccion,
      CODIGO_POSTAL: u.codigoPostal,
      CORREO_ELECTRONICO: u.correoElectronico,
      TELEFONO: u.telefono,
      ESTADO_CIVIL: u.estadoCivil,
      CARGO: u.cargo,
      DEPARTAMENTO: u.departamento,
      FECHA_DE_INGRESO: u.fechaIngreso,
      ACTIVO: u.activo,
      FORMACION_ACADEMICA: u.formacionAcademica,
      ESPECIALIDAD: u.especialidad,
      NIVEL_DE_INGLES: u.nivelDeIngles,
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Listado de Personal.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error al exportar usuarios:", error);
    res.status(500).json({
      message: "Error al exportar a Excel",
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};
