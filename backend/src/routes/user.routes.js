import express from 'express';
import { body } from 'express-validator';


//=== Local Modules ===
import { registerValidator } from '../../validators/user.validator.js';
import { registerUser } from '../controllers/user.controller.js';


//====================================
const userRoutes = express.Router();



//========= Routes ====================

userRoutes.post('/register', registerValidator, registerUser);

userRoutes.post('/login');

userRoutes.get('/profile');

userRoutes.get('/logout');



//====================================
export default userRoutes;