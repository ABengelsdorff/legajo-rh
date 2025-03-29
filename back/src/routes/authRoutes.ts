import { Router } from 'express';
import { loginUser, registerUser, getUsers, deleteUser } from '../controllers/authControllers';
import { verificarToken } from '../middlewares/authMiddlewares';
import { verificarRolAdmin } from '../middlewares/verificarRolAdmin';

const router = Router();

router.post('/login', loginUser);
router.post('/register', verificarToken, verificarRolAdmin, registerUser);
router.get('/usuarios', verificarToken, verificarRolAdmin, getUsers);
router.delete('/usuarios/:id', verificarToken, verificarRolAdmin, deleteUser);


export default router;
