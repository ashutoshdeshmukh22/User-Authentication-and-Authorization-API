const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var randtoken = require('rand-token');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.login = (req, res) => {
  // console.log(req.body);
  // const { email, password } = req.body;

  db.query(
    `select * from users where email = ${db.escape(req.body.email)}`,
    function (err, result) {
      if (err) {
        return res.render('login', {
          message: 'User Does Not Exist',
        });
      }
      if (!result.length) {
        return res.render('login', {
          message: 'Username or password is incorrect!',
        });
      }
      // check passwods
      // if (req.body.password != result[0]['password']) {
      //   return res.render('login', {
      //     message: 'Password is incorrect! Try Again',
      //   });
      // } else {
      //   return res.render('profile');
      // }

      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.render('login', {
              message: 'Password is incorrect! Try Again',
            });
          }
          if (bResult) {
            // creating 24 hours from milliseconds
            const oneDay = 1000 * 60 * 60 * 24;
            const secKey = randtoken.generate(20);
            console.log(secKey);
            var token = jwt.sign(
              {
                name: result[0].name,
                email: result[0].email,
              },
              secKey,
              {
                expiresIn: oneDay,
              }
            );
            return res.render('profile', {
              token,
              message: 'Logged in!',
              user: result[0],
            });
          } else {
            return res.render('login', {
              message: 'Password is incorrect! Try Again',
            });
          }
        }
      );
    }
  );
};
