import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Like, ILike } from 'typeorm';

// Repositorio de la entidad User
const userRepository = AppDataSource.getRepository(User);

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Incluyendo la relación 'grupoFamiliar' en la consulta
    const users = await userRepository.find({
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica'], 
    });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica'],
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


// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = userRepository.create(req.body);
    const result = await userRepository.save(newUser);
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un usuario existente
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


// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id); // Convierte el id a número
    const user = await userRepository.findOneBy({ id: userId }); // Verifica si existe el usuario

    if (user) {
      const result = await userRepository.delete(userId); // Elimina al usuario
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


//Buscar por numero de iosfa
export const getUserByIosfa = async (req: Request, res: Response) => {
  try {
    const { iosfa  } = req.params; // Captura el parámetro de la URL

    const user = await userRepository.findOne({
      where: { numeroDeIosfa: String(iosfa) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica'],
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

//Buscar por numero de DNI
export const getUserByDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params; // Captura el parámetro de la URL

    const user = await userRepository.findOne({
      where: { numeroDeDni: String(dni) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica',], 
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

//Buscar por numero de apellido
export const getUserByApellido = async (req: Request, res: Response) => {
  try {
    const { apellido } = req.params; // Captura el parámetro de la URL

    const user = await userRepository.find({
      where: { apellido: ILike(`%${apellido}%`) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica',],
    });

    if (user.length > 0) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

//Buscar por numero de grado
export const getUserByGrado = async (req: Request, res: Response) => {
  try {
    const { grado } = req.params; // Captura el parámetro de la URL

    const users = await userRepository.find({
      where: { 
        grado: grado as 'CABO' | 'CABO PRIMERO' | 'CABO PRINCIPAL' | 'SUBOFICIAL AUXILIAR' | 'SUBOFICIAL AYUDANTE' | 'SUBOFICIAL PRINCIPAL' | 'SUBOFICIAL MAYOR'
      },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', ], 
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


//Buscar por numero de curso
export const getUserByCurso = async (req: Request, res: Response) => {
  try {
    const { curso } = req.params; // Captura el parámetro de la URL

    const users = await userRepository.find({
      where: { cursosRealizados: Like(`%${curso}%`) },
      relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica'],
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