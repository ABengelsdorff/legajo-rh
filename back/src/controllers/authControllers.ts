import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/generarToken";

const usuarioRepository = AppDataSource.getRepository(Usuario);

// NO ANOTES COMO `RequestHandler`, usá los tipos normales de Express
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { nombreUsuario, contraseña, confirmarContraseña } = req.body;
    if (!nombreUsuario || !contraseña || !confirmarContraseña) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    if (contraseña !== confirmarContraseña) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const existingUser = await usuarioRepository.findOne({ where: { nombreUsuario } });
    if (existingUser) {
      return res.status(400).json({ message: "Ese nombre de usuario ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = usuarioRepository.create({
      nombreUsuario,
      contraseña: hashedPassword,
      rol: "USUARIO",
    });

    await usuarioRepository.save(nuevoUsuario);
    return res.status(201).json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { nombreUsuario, contraseña } = req.body;

    if (!nombreUsuario || !contraseña) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const user = await usuarioRepository.findOne({ where: { nombreUsuario } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // ✅ Generar token
    const token = generarToken({ id: user.id, nombreUsuario: user.nombreUsuario, rol: user.rol });

    // ✅ Enviar token al frontend
    return res.status(200).json({
      message: "Login exitoso",
      token,
      nombreUsuario: user.nombreUsuario,
      rol: user.rol,
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Incluyendo la relación 'grupoFamiliar' en la consulta
    const users = await usuarioRepository.find();
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


// Eliminar usuario por ID (solo para admins)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    
    const user = await usuarioRepository.findOne({ where: { id: userId } });
    

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuarioRepository.remove(user);

    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
