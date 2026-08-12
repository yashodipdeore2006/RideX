import express from 'express';
import cors from 'cors';
import cookieParse from 'cookie-parser';
import dotenv from 'dotenv';

//=== Local modules ===
import userRoutes from './routes/user.routes.js';
import { connectDB } from './config/db.config.js';


//======== APP =========
const app = express();
dotenv.config();

connectDB();

//================ Middleware ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParse());


//=============== Routes =======================
//Basic route
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RideX backend API' });
});


//====== Main Routes =======

app.use('/api/v1/users', userRoutes);





//============================================
export default app;