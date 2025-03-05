import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByIosfa } from "../controllers/userControllers";

const router = Router();

// Rutas CRUD para usuarios
router.get('/iosfa/:iosfa', getUserByIosfa);
router.get('/', getAllUsers);        
router.get('/:id', getUserById);     
router.post('/', createUser);        
router.put('/:id', updateUser);      
router.delete('/:id', deleteUser);   


export default router;
