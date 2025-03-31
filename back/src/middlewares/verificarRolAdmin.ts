import { Request, Response, NextFunction } from "express";

export function verificarRolAdmin(req: Request, res: Response, next: NextFunction): void | Response {
  if (!req.usuario || req.usuario.rol !== "ADMIN") {
   res.status(403).json({ message: "Acceso denegado: se requiere rol de administrador" });
   return 
  }

  next();
}
