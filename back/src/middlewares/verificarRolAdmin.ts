import { Request, Response, NextFunction } from "express";

export function verificarRolAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.usuario || req.usuario.rol !== "ADMIN") {
    return res.status(403).json({ message: "Acceso denegado: se requiere rol de administrador" });
  }

  return next();
}
