const express = require('express');
const router = express.Router();

const {createUser, loginUser, allUsers, getUserById} = require('../controllers/userController');
const {loginChecker} = require('../middlewares/loginChecker');
const {roleChecker} = require('../middlewares/roleChecker');

// @Access Public
router.post('/login', loginUser);
router.post('/register',createUser);

// @Access Admin
const adminPermissionsRequired = true;
router.get('/', loginChecker, roleChecker(adminPermissionsRequired), allUsers);
router.get('/:id', loginChecker, roleChecker(adminPermissionsRequired), getUserById)

module.exports = router;
