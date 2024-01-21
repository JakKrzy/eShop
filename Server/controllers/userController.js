const User = require('../models/user');
const AsyncHandler = require("express-async-handler");


/**
 * API to create new user
 * 
 * This API is used to create new user, checks if a user with the provided email
 * already exists, and creates a new user in the database if not. 
 * Returns success or failure responses accordingly. 
 * @Access Public
 */

const createUser = AsyncHandler(async (req, res) => {
    
    let { name, email, password, } = req.body;
    const exist = await User.findOne({email});
    if (exist)
    {
        res.status(400);
        throw new Error("User with that email already exists");
    }else
    {
        const user = await User.create({
            name, 
            email,
            password,
        });
        if (user){
            res.status(200).json({ status: 'success', data: { ...user} });
        }else
        {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid Data',
            })
        }
    }
});

/**
 * API to user login 
 * 
 * The API extracts email and password from the request body, finds the user with the provided email,
 * checks the password, and generates a JWT token if authentication is successful. 
 * Returns success or failure responses accordingly.
 * @Access Public
 */

const loginUser = AsyncHandler(async (req, res) =>{

    let {email, password} = req.body;
    const user = await User.findOne({email});
    const checkPassword = await user.matchPassword(password);
    if (user && checkPassword)
    {
        let userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        let token = user.generateToken(userData);
        res.status(200).json({ status: 'success', data: { ...userData, token } });
    }else
    {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid Email or Password',
        })
    }
});

/**
 * API for fetching all users.
 * 
 * This API retrieves all users from the database (excluding sensitive information),
 * and returns a success response with the user data or a failure response if fetching fails.
 * @Access Admin
 */

const allUsers = AsyncHandler(async (req, res) => {
   try{
        const users = await User.find({}, '-password -createdAt -isAdmin -updatedAt -__v');
        res.status(200).json({ status: 'success', data: users });
    } 
    catch(error){
        res.status(401).json({
            status: 'fail',
            message: 'Failed to fetch users',
    });
    }
});

const getUserById = AsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message })
    }
})

module.exports = {createUser, loginUser, allUsers, getUserById};
