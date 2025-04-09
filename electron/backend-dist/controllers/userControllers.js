"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.exportarUsuariosExcel = exports.getUserByCurso = exports.getUserByGrado = exports.getUserByApellido = exports.getUserByDni = exports.getUserByIosfa = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const removeAccents_1 = require("../utils/removeAccents");
const XLSX = __importStar(require("xlsx"));
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find({
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
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOne({
            where: { id: parseInt(req.params.id) },
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
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { id } = _a, userData = __rest(_a, ["id"]);
        // Crear el usuario incluyendo las relaciones
        const newUser = userRepository.create(Object.assign(Object.assign({}, userData), { grupoFamiliar: userData.grupoFamiliar || [], actuaciones: userData.actuaciones || [], solicitudes: userData.solicitudes || [], juntaMedica: userData.juntaMedica || [], parteDeEnfermo: userData.parteDeEnfermo || [], aptitudPsicofisica: userData.aptitudPsicofisica || null, cursosRealizados: userData.cursosRealizados || [] }));
        const result = yield userRepository.save(newUser);
        console.log("📩 Datos recibidos:", req.body);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("❌ Error al crear el usuario:", error);
        res
            .status(500)
            .json({ error: "Error al crear el usuario", detalles: error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOneBy({
            id: parseInt(req.params.id),
        });
        if (user) {
            userRepository.merge(user, req.body);
            const result = yield userRepository.save(user);
            res.json(result);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
});
exports.updateUser = updateUser;
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const user = await userRepository.findOneBy({ id: userId });
//     if (user) {
//       const result = await userRepository.delete(userId);
//       if (result.affected) {
//         res.json({ message: 'Usuario eliminado' });
//       } else {
//         res.status(404).json({ message: 'Usuario no encontrado' });
//       }
//     } else {
//       res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el usuario' });
//   }
// };
const getUserByIosfa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { iosfa } = req.params;
        const users = yield userRepository.find({
            where: { numeroDeIosfa: (0, typeorm_1.ILike)(`%${iosfa}%`) },
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
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
});
exports.getUserByIosfa = getUserByIosfa;
const getUserByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dni } = req.params;
        const users = yield userRepository.find({
            where: { numeroDeDni: (0, typeorm_1.ILike)(`%${dni}%`) },
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
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
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
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
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
            .where("LOWER(curso.nombre) LIKE :nombre", {
            nombre: `%${curso.toLowerCase()}%`,
        })
            .select(["user.id"])
            .getMany();
        const ids = usuariosConCurso.map((u) => u.id);
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
                "cursosRealizados",
            ],
        });
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        console.error("Error en getUserByCurso:", error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
});
exports.getUserByCurso = getUserByCurso;
//Funcion para exportar usuarios a Excel
// Se utiliza la libreria xlsx para crear el archivo Excel
const exportarUsuariosExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const usuarios = yield userRepository.find({
            relations: {
                grupoFamiliar: true,
                actuaciones: true,
                parteDeEnfermo: true,
                solicitudes: true,
                juntaMedica: true,
                aptitudPsicofisica: true,
                cursosRealizados: true,
            },
        });
        const data = usuarios.map((u) => ({
            DESTINADO_EN_LA_UNIDAD: u.destinadoEnLaUnidad,
            IOSFA: u.numeroDeIosfa,
            GRADO: u.grado,
            APELLIDO: u.apellido,
            NOMBRE: u.nombre,
            SEXO: u.sexo,
            FECHA_DE_NACIMIENTO: u.fechaDeNacimiento,
            GRUPO_SANGUINEO: u.grupoSanguineo,
            DNI: u.numeroDeDni,
            CUIL: u.numeroDeCuil,
            DIRECCION: u.direccion,
            CODIGO_POSTAL: u.codigoPostal,
            CORREO_ELECTRONICO: u.correoElectronico,
            CORREO_INSTITUCIONAL: u.correoInstitucional,
            USUARIO_GDE: u.usuarioGde,
            CBU: u.cbu,
            CELULAR: u.numeroDeCelular,
            RTI: u.rti,
            DESTINO_ANTERIOR: u.destinoAnterior,
            INSTITUTO_DE_FORMACION: u.institutoDeFormacion,
            DESTINO_JB_GRUPOS: u.destinoJbGrupos,
            DESTINO_INTERNO: u.destinoInterno,
            CARGO: u.cargo,
            ESCALAFON: u.escalafon,
            ESPECIALIDAD: u.especialidad,
            ESPECIALIDAD_AVANZADA: u.especialidadAvanzada,
            FORMACION_ACADEMICA: u.formacionAcademica,
            NIVEL_DE_INGLES: u.nivelDeIngles,
            COMPROMISO_DE_SERVICIO: u.compromisoDeServicio,
            ULTIMO_ASCENSO: u.ultimoAscenso,
            FOTO_LEGAJO: u.fotoDeLegajo,
            ESTADO_CIVIL: u.estadoCivil,
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        res.setHeader("Content-Disposition", "attachment; filename=Listado de Personal.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    }
    catch (error) {
        console.error("Error al exportar usuarios:", error);
        res
            .status(500)
            .json({
            message: "Error al exportar a Excel",
            error: error.message,
            stack: error.stack,
        });
    }
});
exports.exportarUsuariosExcel = exportarUsuariosExcel;
