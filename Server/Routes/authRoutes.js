import express from 'express';
import { verifyToken } from '../Controller/authController.js';

const authRouter = express.Router();

authRouter.post('/auth/verify-token', verifyToken);

export default authRouter;