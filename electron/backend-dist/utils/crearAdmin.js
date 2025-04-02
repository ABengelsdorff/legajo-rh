"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearAdminSiNoExiste = crearAdminSiNoExiste;
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entities/Usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
//funcion para crear admin si no existe
function crearAdminSiNoExiste() {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
        const adminExistente = yield repo.findOne({ where: { nombreUsuario: "admin" } });
        if (!adminExistente) {
            const hashed = yield bcrypt_1.default.hash("admin123", 10);
            const nuevoAdmin = repo.create({
                nombreUsuario: "admin",
                contraseña: hashed,
                rol: "ADMIN",
            });
            yield repo.save(nuevoAdmin);
            console.log("✅ Administrador creado con nombreUsuario 'admin' y contraseña 'admin123'");
        }
        else {
            console.log("ℹ️ El administrador ya existe.");
        }
    });
}
exports.default = crearAdminSiNoExiste;
