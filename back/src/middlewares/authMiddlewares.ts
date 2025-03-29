import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Agregamos una propiedad al tipo Request para guardar los datos del token
declare global {
  namespace Express {
    interface Request {
      usuario?: any;
    }
  }
}
export function verificarToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto123");
      req.usuario = decoded; // Guardamos los datos del usuario en la request
      return next(); // ✅ Ahora retornamos el next()
    } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  }
  