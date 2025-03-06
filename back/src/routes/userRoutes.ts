import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByIosfa, getUserByDni, getUserByApellido, getUserByGrado, getUserByCurso } from "../controllers/userControllers";

const router = Router();

// Rutas CRUD para usuarios
router.get('/iosfa/:iosfa', getUserByIosfa);
router.get('/dni/:dni', getUserByDni);
router.get('/apellido/:apellido', getUserByApellido);
router.get('/grado/:grado', getUserByGrado);
router.get('/curso/:curso', getUserByCurso);
router.get('/', getAllUsers);        
router.get('/:id', getUserById);     
router.post('/', createUser);        
router.put('/:id', updateUser);      
router.delete('/:id', deleteUser);   


export default router;
