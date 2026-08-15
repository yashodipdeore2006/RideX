import express from 'express';
import { body, check } from 'express-validator';


//=== Local Modules ===
import { registerValidator, loginValidator } from '../../validators/user.validator.js';
import { registerUser, loginUser, profileUser, logoutUser } from '../controllers/user.controller.js';
import checkAuth from '../middleware/checkAuth.js';

//====================================
const userRoutes = express.Router();



//========= Routes ====================

userRoutes.post('/register', registerValidator, registerUser);

userRoutes.post('/login', loginValidator, loginUser);

userRoutes.get('/logout', checkAuth, logoutUser);

userRoutes.get('/profile', checkAuth, profileUser);




//====================================
export default userRoutes;