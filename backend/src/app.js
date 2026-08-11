import express from 'express';




//============================================
const app = express();


//================ Middleware ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//=============== Routes =======================
//Basic route
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RideX backend API' });
});



//============================================
export default app;