import http from 'http';

//=== Local modules ===
import app from './app.js';


//============================================
const server = http.createServer(app);




//============================================
const PORT = process.env.PORT || 800;

server.listen(PORT, () => {
  console.log('server is running at : http://localhost:' + PORT);
});