import express from 'express';


//=== Local module ===
import { captainRegisterValidator } from '../../validators/captain.validator.js';
import { registerCaptain } from '../controllers/captain.controller.js';

//=======================================
const captainRoutes = express.Router();

//======================================
captainRoutes.post('/register', captainRegisterValidator, registerCaptain);




//========================================
export default captainRoutes;