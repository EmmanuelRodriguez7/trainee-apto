const express = require('express');
const app = express();
const { connectDB } = require('./config/db.js');

connectDB();

app.listen(process .env.PORT || 3000);
console.log('Server on port', process.env.PORT || 3000);

app.use(express.json());

app.use('/libreria', require('./routes/libros-routes'));