import express from 'express';
import cors from 'cors';
import cookieParse from 'cookie-parser';

//=== Local modules ===
import userRoutes from './routes/user.routes';



//======== APP =========
const app = express();


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