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
exports.GrupoFamiliar = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let GrupoFamiliar = class GrupoFamiliar {
};
exports.GrupoFamiliar = GrupoFamiliar;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GrupoFamiliar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "personalMilitar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.grupoFamiliar),
    __metadata("design:type", User_1.User)
], GrupoFamiliar.prototype, "user", void 0);
exports.GrupoFamiliar = GrupoFamiliar = __decorate([
    (0, typeorm_1.Entity)()
], GrupoFamiliar);
