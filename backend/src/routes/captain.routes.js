import express from 'express';


//=== Local module ===
import { captainRegisterValidator, captainLoginValidator } from '../../validators/captain.validator.js';
import { registerCaptain, loginCaptain, logoutCaptain } from '../controllers/captain.controller.js';
import { check } from 'express-validator';
import { checkAuthCaptain } from '../middleware/checkAuth.js';

//=======================================
const captainRoutes = express.Router();

//======================================
captainRoutes.post('/register', captainRegisterValidator, registerCaptain);

captainRoutes.post('/login', captainLoginValidator, loginCaptain);

captainRoutes.get('/logout', checkAuthCaptain, logoutCaptain);



//========================================
export default captainRoutes;