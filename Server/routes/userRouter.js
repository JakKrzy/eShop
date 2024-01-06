const express = require('express');
const router = express.Router();

const {createUser, loginUser, allUsers} = require('../controllers/userController');
const {loginChecker} = require('../middlewares/loginChecker');
const {roleChecker} = require('../middlewares/roleChecker');

// @Access Public
router.post('/login', loginUser);
router.post('/register',createUser);

// @Access Admin
router.get('/', loginChecker, roleChecker(true), allUsers);

module.exports = router;
