import express from 'express';
import { register, errorhandler, notFound, login } from '../controllers';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.use(errorhandler);
router.use(notFound);

export default router;
