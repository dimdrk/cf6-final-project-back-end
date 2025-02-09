const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const userService = require('../services/user.services');

// protected
router.get('/admin/all', userController.findAll);
router.get('/user/:username', userController.findUser);
router.patch('/user/:username', userController.update);
router.delete('/user/:username', userController.delete);

// unprotected
router.post('/login', userService.loginUser);
router.post('/register', userService.registerUser);

module.exports = router;