"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarToken = generarToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generarToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "secreto123", {
        expiresIn: "1h", // el token expira en 1 hora
    });
}
