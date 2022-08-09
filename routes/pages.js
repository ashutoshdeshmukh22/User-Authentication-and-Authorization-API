const express = require('express');
const router = express.Router();
const userMiddleware = require('../controllers/access');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  // res.send('This is the secret content. Only logged in users can see that!');
  res.render('profile');
});

module.exports = router;
