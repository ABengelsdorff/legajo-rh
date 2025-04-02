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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User"); //TypeORM mapeará esta clase a una tabla en la base de datos
const GrupoFamiliar_1 = require("../entities/GrupoFamiliar");
const Actuacion_1 = require("../entities/Actuacion");
const JuntaMedica_1 = require("../entities/JuntaMedica");
const Solicitud_1 = require("../entities/Solicitud");
const ParteDeEnfermo_1 = require("../entities/ParteDeEnfermo");
const AptitudPsicofisica_1 = require("../entities/AptitudPsicofisica");
const CursoRealizado_1 = require("../entities/CursoRealizado");
const Usuario_1 = require("../entities/Usuario");
const path = __importStar(require("path"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: path.join(process.cwd(), "database.sqlite"),
    synchronize: false, // Crea tablas automáticamente (desactivar para produccion)  
    // compara las entidades definidas en el código con la base de datos y realiza los cambios necesarios para que coincidan
    logging: true,
    entities: [User_1.User, Usuario_1.Usuario,
        GrupoFamiliar_1.GrupoFamiliar,
        Actuacion_1.Actuacion,
        JuntaMedica_1.JuntaMedica,
        Solicitud_1.Solicitud,
        ParteDeEnfermo_1.ParteDeEnfermo,
        AptitudPsicofisica_1.AptitudPsicofisica,
        CursoRealizado_1.CursoRealizado],
});
