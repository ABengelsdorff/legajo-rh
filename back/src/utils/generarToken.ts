import jwt from "jsonwebtoken";

export function generarToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET || "secreto123", {
    expiresIn: "1h", // el token expira en 1 hora
  });
}
