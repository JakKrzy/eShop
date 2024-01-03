const router = require("express").Router();
const User = require("./models/user");
const users = require("./example_data/users");
const Product = require("./models/product");
const products = require("./example_data/products");

router.post('/users', async(req, res ) =>{
    await User.deleteMany({});
    const UserSeeder = await User.insertMany(users);
    res.send({UserSeeder});
})

router.post('/products', async(req, res ) =>{
    await Product.deleteMany({});
    const ProductSeeder = await Product.insertMany(products);
    res.send({ProductSeeder});
})

module.exports = router;
