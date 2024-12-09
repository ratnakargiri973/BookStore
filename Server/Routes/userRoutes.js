import express from 'express';
import { register } from '../Controller/userController.js';

const userRouter = express.Router();

userRouter.post('/add/user', register);

export default userRouter;