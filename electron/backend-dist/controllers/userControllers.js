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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByCurso = exports.getUserByGrado = exports.getUserByApellido = exports.getUserByDni = exports.getUserByIosfa = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const removeAccents_1 = require("../utils/removeAccents");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find({
            relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { id } = _a, userData = __rest(_a, ["id"]);
        const newUser = userRepository.create(req.body);
        const result = yield userRepository.save(newUser);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("❌ Error al crear el usuario:", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
            userRepository.merge(user, req.body);
            const result = yield userRepository.save(user);
            res.json(result);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const user = yield userRepository.findOneBy({ id: userId });
        if (user) {
            const result = yield userRepository.delete(userId);
            if (result.affected) {
                res.json({ message: 'Usuario eliminado' });
            }
            else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});
exports.deleteUser = deleteUser;
const getUserByIosfa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { iosfa } = req.params;
        const users = yield userRepository.find({
            where: { numeroDeIosfa: (0, typeorm_1.ILike)(`%${iosfa}%`) },
            relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
        });
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});
exports.getUserByIosfa = getUserByIosfa;
const getUserByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dni } = req.params;
        const users = yield userRepository.find({
            where: { numeroDeDni: (0, typeorm_1.ILike)(`%${dni}%`) },
            relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
        });
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});
exports.getUserByDni = getUserByDni;
const getUserByApellido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { apellido } = req.params;
        const apellidoNormalizado = (0, removeAccents_1.quitarTildes)(apellido.toLowerCase());
        // Obtener todos los usuarios (con relaciones necesarias)
        const allUsers = yield userRepository.find({
            relations: [
                "grupoFamiliar",
                "actuaciones",
                "solicitudes",
                "juntaMedica",
                "parteDeEnfermo",
                "aptitudPsicofisica",
                "cursosRealizados",
            ],
        });
        // Filtrar comparando sin tildes
        const filtered = allUsers.filter((user) => (0, removeAccents_1.quitarTildes)(user.apellido.toLowerCase()).includes(apellidoNormalizado));
        if (filtered.length > 0) {
            res.json(filtered);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
});
exports.getUserByApellido = getUserByApellido;
const getUserByGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { grado } = req.params;
        const users = yield userRepository.find({
            where: { grado: (0, typeorm_1.ILike)(`%${grado}%`) },
            relations: ['grupoFamiliar', 'actuaciones', 'solicitudes', 'juntaMedica', 'parteDeEnfermo', 'aptitudPsicofisica', 'cursosRealizados'],
        });
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});
exports.getUserByGrado = getUserByGrado;
const getUserByCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { curso } = req.params;
        // Obtener usuarios que tienen un curso que coincida
        const usuariosConCurso = yield userRepository
            .createQueryBuilder("user")
            .leftJoin("user.cursosRealizados", "curso")
            .where("LOWER(curso.nombre) LIKE :nombre", { nombre: `%${curso.toLowerCase()}%` })
            .select(["user.id"])
            .getMany();
        const ids = usuariosConCurso.map(u => u.id);
        // Traer usuarios completos por ID, con TODAS las relaciones
        const users = yield userRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
            relations: [
                "grupoFamiliar",
                "actuaciones",
                "solicitudes",
                "juntaMedica",
                "parteDeEnfermo",
                "aptitudPsicofisica",
                "cursosRealizados"
            ],
        });
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error("Error en getUserByCurso:", error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});
exports.getUserByCurso = getUserByCurso;
