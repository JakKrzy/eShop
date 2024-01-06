const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
    name : { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    },
    {
    timestamps: true
    }
);

//Before saving user hash password and then save
userSchema.pre('save', async function (next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
})

// Checks whether entered password is correct
userSchema.methods.matchPassword = async function (given_password){
    return await bcrypt.compare(given_password, this.password);
}

// Generating Token 
userSchema.methods.generateToken = function (user){
    secret = process.env.JWT_SECRET;
    expiration_time = process.env.JWT_EXP_TIME;
    return jwt.sign(user, secret, {expiresIn: expiration_time})
}



module.exports = mongoose.model("User",userSchema);
