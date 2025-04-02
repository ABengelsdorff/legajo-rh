import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/generarToken";

const usuarioRepository = AppDataSource.getRepository(Usuario);

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombreUsuario, contraseña, confirmarContraseña, rol } = req.body;

    if (!nombreUsuario || !contraseña || !confirmarContraseña || !rol) {
      res.status(400).json({ message: "Faltan campos requeridos" });
      return;
    }

    if (contraseña !== confirmarContraseña) {
      res.status(400).json({ message: "Las contraseñas no coinciden" });
      return;
    }

    const existingUser = await usuarioRepository.findOne({ where: { nombreUsuario } });
    if (existingUser) {
      res.status(400).json({ message: "Ese nombre de usuario ya está en uso" });
      return;
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = usuarioRepository.create({
      nombreUsuario,
      contraseña: hashedPassword,
      rol,
    });

    await usuarioRepository.save(nuevoUsuario);
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombreUsuario, contraseña } = req.body;

    if (!nombreUsuario || !contraseña) {
      res.status(400).json({ message: "Faltan campos requeridos" });
      return;
    }

    const user = await usuarioRepository.findOne({ where: { nombreUsuario } });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    if (!validPassword) {
      res.status(401).json({ message: "Contraseña incorrecta" });
      return;
    }

    const token = generarToken({
      id: user.id,
      nombreUsuario: user.nombreUsuario,
      rol: user.rol,
    });

    res.status(200).json({
      message: "Login exitoso",
      token,
      nombreUsuario: user.nombreUsuario,
      rol: user.rol,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await usuarioRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Eliminar usuario por ID (solo para admins)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const user = await usuarioRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    await usuarioRepository.remove(user);
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};