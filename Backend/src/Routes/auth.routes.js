const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/authMiddleware')


// with prefix**** /api/auth
authRoute.post('/register', authController.registerUser);
authRoute.post('/login', authController.loginUser);
authRoute.post('/logout', authController.logoutUser);
// protected Route**** by token
authRoute.get('/me', authMiddleware.authMiddleware, authController.getCurrentUser);
authRoute.patch("/location", authMiddleware.authMiddleware , authController.updateLocation);

module.exports = authRoute;