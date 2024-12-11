import express from 'express';
import { login, register } from '../Controller/userController.js';

const userRouter = express.Router();

userRouter.post('/add/user', register);
userRouter.post('/login/user', login);

export default userRouter;