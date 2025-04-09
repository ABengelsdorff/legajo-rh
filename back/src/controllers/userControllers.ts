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
        "grupoFamiliar",
        "actuaciones",
        "solicitudes",
        "juntaMedica",
        "parteDeEnfermo",
        "aptitudPsicofisica",
        "cursosRealizados",
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
        "grupoFamiliar",
        "actuaciones",
        "solicitudes",
        "juntaMedica",
        "parteDeEnfermo",
        "aptitudPsicofisica",
        "cursosRealizados",
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
      grupoFamiliar: userData.grupoFamiliar || [],
      actuaciones: userData.actuaciones || [],
      solicitudes: userData.solicitudes || [],
      juntaMedica: userData.juntaMedica || [],
      parteDeEnfermo: userData.parteDeEnfermo || [],
      aptitudPsicofisica: userData.aptitudPsicofisica || null,
      cursosRealizados: userData.cursosRealizados || [],
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

export const getUserByIosfa = async (req: Request, res: Response) => {
  try {
    const { iosfa } = req.params;
    const users = await userRepository.find({
      where: { numeroDeIosfa: ILike(`%${iosfa}%`) },
      relations: [
        "grupoFamiliar",
        "actuaciones",
        "solicitudes",
        "juntaMedica",
        "parteDeEnfermo",
        "aptitudPsicofisica",
        "cursosRealizados",
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

export const getUserByDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const users = await userRepository.find({
      where: { numeroDeDni: ILike(`%${dni}%`) },
      relations: [
        "grupoFamiliar",
        "actuaciones",
        "solicitudes",
        "juntaMedica",
        "parteDeEnfermo",
        "aptitudPsicofisica",
        "cursosRealizados",
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

export const getUserByApellido = async (req: Request, res: Response) => {
  try {
    const { apellido } = req.params;
    const apellidoNormalizado = quitarTildes(apellido.toLowerCase());

    // Obtener todos los usuarios (con relaciones necesarias)
    const allUsers = await userRepository.find({
      relations: [
        "grupoFamiliar",
        "actuaciones",
        "solicitudes",
        "juntaMedica",
        "parteDeEnfermo",
        "aptitudPsicofisica",
        "cursosRealizados",
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

export const getUserByGrado = async (req: Request, res: Response) => {
  try {
    const { grado } = req.params;
    const users = await userRepository.find({
      where: { grado: ILike(`%${grado}%`) },
      relations: [
        "grupoFamiliar",
        "actuaciones",
        "solicitudes",
        "juntaMedica",
        "parteDeEnfermo",
        "aptitudPsicofisica",
        "cursosRealizados",
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
        "grupoFamiliar",
        "actuaciones",
        "solicitudes",
        "juntaMedica",
        "parteDeEnfermo",
        "aptitudPsicofisica",
        "cursosRealizados",
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
        grupoFamiliar: true,
        actuaciones: true,
        parteDeEnfermo: true,
        solicitudes: true,
        juntaMedica: true,
        aptitudPsicofisica: true,
        cursosRealizados: true,
      },
    });

    const data = usuarios.map((u) => ({
      DESTINADO_EN_LA_UNIDAD: u.destinadoEnLaUnidad,
      IOSFA: u.numeroDeIosfa,
      GRADO: u.grado,
      APELLIDO: u.apellido,
      NOMBRE: u.nombre,
      SEXO: u.sexo,
      FECHA_DE_NACIMIENTO: u.fechaDeNacimiento,
      GRUPO_SANGUINEO: u.grupoSanguineo,
      DNI: u.numeroDeDni,
      CUIL: u.numeroDeCuil,
      DIRECCION: u.direccion,
      CODIGO_POSTAL: u.codigoPostal,
      CORREO_ELECTRONICO: u.correoElectronico,
      CORREO_INSTITUCIONAL: u.correoInstitucional,
      USUARIO_GDE: u.usuarioGde,
      CBU: u.cbu,
      CELULAR: u.numeroDeCelular,
      RTI: u.rti,
      DESTINO_ANTERIOR: u.destinoAnterior,
      INSTITUTO_DE_FORMACION: u.institutoDeFormacion,
      DESTINO_JB_GRUPOS: u.destinoJbGrupos,
      DESTINO_INTERNO: u.destinoInterno,
      CARGO: u.cargo,
      ESCALAFON: u.escalafon,
      ESPECIALIDAD: u.especialidad,
      ESPECIALIDAD_AVANZADA: u.especialidadAvanzada,
      FORMACION_ACADEMICA: u.formacionAcademica,
      NIVEL_DE_INGLES: u.nivelDeIngles,
      COMPROMISO_DE_SERVICIO: u.compromisoDeServicio,
      ULTIMO_ASCENSO: u.ultimoAscenso,
      FOTO_LEGAJO: u.fotoDeLegajo,
      ESTADO_CIVIL: u.estadoCivil,
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
    res
      .status(500)
      .json({
        message: "Error al exportar a Excel",
        error: (error as Error).message,
        stack: (error as Error).stack,
      });
  }
};
