const express = require('express');
const router  = express.Router();
router.use(express.json());
const User = require("../model/users");
const userController = require('../controllers/users');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);


module.exports = router;