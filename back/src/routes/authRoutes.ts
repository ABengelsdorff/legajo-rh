import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authControllers';
import { verificarToken } from '../middlewares/authMiddlewares';
import { verificarRolAdmin } from '../middlewares/verificarRolAdmin';

const router = Router();

router.post('/login', loginUser);
router.post('/register', verificarToken, verificarRolAdmin, registerUser);

export default router;
