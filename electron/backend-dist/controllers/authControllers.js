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
exports.deleteUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entities/Usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generarToken_1 = require("../utils/generarToken");
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield usuarioRepository.findOne({ where: { nombreUsuario } });
        if (existingUser) {
            res.status(400).json({ message: "Ese nombre de usuario ya está en uso" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(contraseña, 10);
        const nuevoUsuario = usuarioRepository.create({
            nombreUsuario,
            contraseña: hashedPassword,
            rol,
        });
        yield usuarioRepository.save(nuevoUsuario);
        res.status(201).json({ message: "Usuario creado correctamente" });
    }
    catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreUsuario, contraseña } = req.body;
        if (!nombreUsuario || !contraseña) {
            res.status(400).json({ message: "Faltan campos requeridos" });
            return;
        }
        const user = yield usuarioRepository.findOne({ where: { nombreUsuario } });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        const validPassword = yield bcrypt_1.default.compare(contraseña, user.contraseña);
        if (!validPassword) {
            res.status(401).json({ message: "Contraseña incorrecta" });
            return;
        }
        const token = (0, generarToken_1.generarToken)({
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
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.loginUser = loginUser;
// Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield usuarioRepository.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});
exports.getUsers = getUsers;
// Eliminar usuario por ID (solo para admins)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const user = yield usuarioRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        yield usuarioRepository.remove(user);
        res.status(200).json({ message: "Usuario eliminado con éxito" });
    }
    catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
});
exports.deleteUser = deleteUser;
