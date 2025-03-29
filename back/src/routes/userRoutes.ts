import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByIosfa, getUserByDni, getUserByApellido, getUserByGrado, getUserByCurso } from "../controllers/userControllers";
import { verificarToken } from '../middlewares/authMiddlewares';
import { verificarRolAdmin } from "../middlewares/verificarRolAdmin";

const router = Router();

router.use(verificarToken);


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
router.delete('/:id', verificarRolAdmin, deleteUser); // Solo ADMIN puede borrar  


export default router;
