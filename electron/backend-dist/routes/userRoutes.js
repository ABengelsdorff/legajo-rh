"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
// router.use(verificarToken);
// Rutas CRUD para usuarios
router.get('/iosfa/:iosfa', userControllers_1.getUserByIosfa);
router.get('/dni/:dni', userControllers_1.getUserByDni);
router.get('/apellido/:apellido', userControllers_1.getUserByApellido);
router.get('/grado/:grado', userControllers_1.getUserByGrado);
router.get('/curso/:curso', userControllers_1.getUserByCurso);
router.get('/', userControllers_1.getAllUsers);
router.get('/:id', userControllers_1.getUserById);
router.post('/', userControllers_1.createUser);
router.put('/:id', userControllers_1.updateUser);
// router.delete('/:id', verificarRolAdmin, deleteUser); // Solo ADMIN puede borrar  
exports.default = router;
