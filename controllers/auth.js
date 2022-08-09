const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req, res) => {
  console.log(req.body);

  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;
  // const passwordConfirm = req.body.passwordConfirm;

  // Same as Above Code (Called DeStructuring in JS)
  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    'SELECT email from users WHERE email= ?',
    [email],
    async (error, result) => {
      if (error) {
        console.log('Error' + error);
      }
      if (result.length > 0) {
        return res.render('register', {
          message: 'This Email is Already Exists',
        });
      } else if (password !== passwordConfirm) {
        return res.render('register', {
          message: 'Password Do Not Match',
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8); // 8 means how many rounds we want to hash
      console.log('Hashed Pass :-' + hashedPassword);

      db.query(
        'INSERT INTO users SET ?',
        {
          name: name,
          email: email,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            return res.render('register', {
              message: 'User Registerd Sucessfully',
            });
          }
        }
      );
    }
  );
};
