const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB)
.then(() => console.log("Succesfully connected to DB"))
.then((err) => {err;})

app.get("/", (req, res) =>{
    res.send('App is running');
})

usersSeeder = require("./seedDatabase");
app.use('/api', usersSeeder);


app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT || 3000}`);
})
