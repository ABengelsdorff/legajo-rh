import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { ILike } from 'typeorm';
import { In } from "typeorm";
import { quitarTildes } from '../utils/removeAccents';

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, ...userData } = req.body;
    
    const newUser = userRepository.create(req.body);
    const result = await userRepository.save(newUser);
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
    if (user) {
      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      res.json(result);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userRepository.findOneBy({ id: userId });

    if (user) {
      const result = await userRepository.delete(userId);
      if (result.affected) {
        res.json({ message: 'Usuario eliminado' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

export const getUserByIosfa = async (req: Request, res: Response) => {
  try {
    const { iosfa } = req.params;
    const users = await userRepository.find({
      where: { numeroDeIosfa: ILike(`%${iosfa}%`) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
    });
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const getUserByDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const users = await userRepository.find({
      where: { numeroDeDni: ILike(`%${dni}%`) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
    });
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
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
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
    });
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const getUserByCurso = async (req: Request, res: Response) => {
  try {
    const { curso } = req.params;

    // Obtener usuarios que tienen un curso que coincida
    const usuariosConCurso = await userRepository
      .createQueryBuilder("user")
      .leftJoin("user.cursosRealizados", "curso")
      .where("LOWER(curso.nombre) LIKE :nombre", { nombre: `%${curso.toLowerCase()}%` })
      .select(["user.id"])
      .getMany();

    const ids = usuariosConCurso.map(u => u.id);

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
        "cursosRealizados"
      ],
    });

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error en getUserByCurso:", error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};
