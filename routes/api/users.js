const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// const user = require ('../../models/User')
// const blogpost = require ('../../models/Blogpost')
// const comment = require ('../../models/Comment')

// const bcrypt = require('bcrypt');
// const saltRounds = process.env.SALT_ROUNDS;
// const jwtSecret = process.env.JWT_SECRET;
// const jwt = require('jwt-simple');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

///////////////////////////////////////////////////////////////


module.exports = router;