import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { ILike } from 'typeorm';

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
    const users = await userRepository.find({
      where: { apellido: ILike(`%${apellido}%`) },
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

    const users = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cursosRealizados", "curso")
      .leftJoinAndSelect("user.grupoFamiliar", "grupoFamiliar")
      .leftJoinAndSelect("user.actuaciones", "actuaciones")
      .leftJoinAndSelect("user.solicitudes", "solicitudes")
      .leftJoinAndSelect("user.juntaMedica", "juntaMedica")
      .leftJoinAndSelect("user.parteDeEnfermo", "parteDeEnfermo")
      .leftJoinAndSelect("user.aptitudPsicofisica", "aptitudPsicofisica")
      .where("LOWER(curso.nombre) LIKE :nombre", { nombre: `%${curso.toLowerCase()}%` })
      .getMany();

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
