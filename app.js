const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
// console.log(__dirname);
app.use(express.static(publicDirectory));

// Parse URL Encoded Bodies (As sent by the HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON Bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
  if (error) {
    console.log('Db Connection rror');
  } else {
    console.log('MySQL Database Connected ...');
  }
});

// app.get('/', (req, res) => {
//   //   res.send('<h1>This is Home Page</h1>');
//   res.render('index');
// });

// app.get('/register', (req, res) => {
//   //   res.send('<h1>This is Register Page</h1>');
//   res.render('register');
// });

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
  console.log('Server Started on Port 5000');
});
