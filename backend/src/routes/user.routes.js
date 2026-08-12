import express from 'express';
import { body } from 'express-validator';



//====================================
const userRoutes = express.Router();



//========= Routes ====================

userRoutes.post('/register');

userRoutes.post('/login');

userRoutes.get('/profile');

userRoutes.get('/logout');



//====================================
export default userRoutes;