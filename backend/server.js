import express from "express";


const app = express();






app.get('/', (req, res) => {
  res.send("Server is working")
});



const PORT = 8000;

app.listen(PORT, () => {
  console.log('server is running at : http://localhost:' + PORT);
});