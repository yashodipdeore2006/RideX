import express from 'express';


//=== Local module ===
import { captainRegisterValidator, captainLoginValidator } from '../../validators/captain.validator.js';
import { registerCaptain, loginCaptain } from '../controllers/captain.controller.js';

//=======================================
const captainRoutes = express.Router();

//======================================
captainRoutes.post('/register', captainRegisterValidator, registerCaptain);

captainRoutes.post('/login', captainLoginValidator, loginCaptain);
//========================================
export default captainRoutes;