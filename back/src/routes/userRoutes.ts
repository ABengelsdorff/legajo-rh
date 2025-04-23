import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, getUserByDni, getUserByApellido, getUserByCurso, exportarUsuariosExcel, getUserByCargo } from "../controllers/userControllers";

const router = Router();

// router.use(verificarToken);


// Rutas CRUD para usuarios
router.get('/dni/:dni', getUserByDni);
router.get('/apellido/:apellido', getUserByApellido);
router.get('/cargo/:cargo', getUserByCargo);
router.get('/curso/:curso', getUserByCurso);
router.get('/', getAllUsers);        
router.get('/:id', getUserById);     
router.post('/', createUser);        
router.put('/:id', updateUser);   
router.get("/export/excel", exportarUsuariosExcel);
// router.delete('/:id', verificarRolAdmin, deleteUser); // Solo ADMIN puede borrar  


export default router;
