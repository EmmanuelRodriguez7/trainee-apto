const express = require('express');
const { connectDB } = require('./config/db.js');
const path = require('path');
const morgan = require('morgan');

connectDB();
const app = express();

//setting

app.listen(process .env.PORT || 3000);
console.log('Server on port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares

app.use(morgan('dev'));
app.use(express.json());

//routes

app.use('/libreria', require('./routes/libros-routes'));