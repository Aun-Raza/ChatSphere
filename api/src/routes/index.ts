import express from 'express';
import {
  register,
  errorhandler,
  notFound,
  login,
  auth,
  getMessages,
} from '../controllers';

const router = express.Router();

router.get('/messages/:id', getMessages);

router.get('/auth', auth);

router.post('/register', register);

router.post('/login', login);

router.use(errorhandler);
router.use(notFound);

export default router;
