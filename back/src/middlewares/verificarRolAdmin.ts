import { Request, Response, NextFunction } from "express";

export async function verificarRolAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.usuario || req.usuario.rol !== "ADMIN") {
    res.status(403).json({ message: "Acceso denegado: se requiere rol de administrador" });
    return;
  }

  next();
}
