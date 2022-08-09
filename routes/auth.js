const express = require('express');
const authController = require('../controllers/auth');
const loginController = require('../controllers/login');
// const logoutController = require('../controllers/logout');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', loginController.login);
// router.post('/logout', logoutController.logout);

module.exports = router;
