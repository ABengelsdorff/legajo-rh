"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const GrupoFamiliar_1 = require("./GrupoFamiliar");
const Actuacion_1 = require("./Actuacion");
const JuntaMedica_1 = require("./JuntaMedica");
const Solicitud_1 = require("./Solicitud");
const ParteDeEnfermo_1 = require("./ParteDeEnfermo");
const AptitudPsicofisica_1 = require("./AptitudPsicofisica");
const CursoRealizado_1 = require("./CursoRealizado");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "fechaDeNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "grupoSanguineo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "numeroDeDni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "numeroDeCuil", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "codigoPostal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "correoElectronico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "correoInstitucional", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "usuarioGde", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "cbu", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "numeroDeCelular", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "numeroDeIosfa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "rti", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "destinoAnterior", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, class_validator_1.IsIn)([
        "EAM",
        "ESFA",
        "IFE",
        "ESFAC",
        "CUPROSO",
        "CUSERPRO",
        "INCORPORACION TROPA",
        "ESFAE",
        "BAME",
    ]),
    __metadata("design:type", String)
], User.prototype, "institutoDeFormacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "grado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, class_validator_1.IsIn)(["JEFATURA", "GRUPO BASE", "ESCUADRON TECNICO", "GRUPO AEREO"]),
    __metadata("design:type", String)
], User.prototype, "destinoJbGrupos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "destinoInterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, class_validator_1.IsIn)(["SI", "NO"]),
    __metadata("design:type", String)
], User.prototype, "destinadoEnLaUnidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, class_validator_1.IsIn)(["ENCARGADO", "AUXILIAR"]),
    __metadata("design:type", String)
], User.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "escalafon", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "especialidadAvanzada", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "formacionAcademica", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "nivelDeIngles", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "compromisoDeServicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "ultimoAscenso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fotoDeLegajo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, class_validator_1.IsIn)(["SOLTERO", "CASADO", "CONCUBINATO", "DIVORCIADO", "VIUDO"]),
    __metadata("design:type", String)
], User.prototype, "estadoCivil", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "situacionDeRevista", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GrupoFamiliar_1.GrupoFamiliar, (grupoFamiliar) => grupoFamiliar.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "grupoFamiliar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Actuacion_1.Actuacion, (actuacion) => actuacion.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "actuaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JuntaMedica_1.JuntaMedica, (juntaMedica) => juntaMedica.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "juntaMedica", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Solicitud_1.Solicitud, (solicitud) => solicitud.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "solicitudes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ParteDeEnfermo_1.ParteDeEnfermo, (parteDeEnfermo) => parteDeEnfermo.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "parteDeEnfermo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AptitudPsicofisica_1.AptitudPsicofisica, (aptitud) => aptitud.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "aptitudPsicofisica", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CursoRealizado_1.CursoRealizado, (curso) => curso.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "cursosRealizados", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
