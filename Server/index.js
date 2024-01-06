const express = require('express');
const dotenv = require('dotenv');

const app = express();
app.use(express.json())

dotenv.config();

const PORT = process.env.PORT;
const MONGO = process.env.MONGODB;

const mongoose = require('mongoose');

mongoose.connect(MONGO)
.then(() => console.log("Succesfully connected to DB"))
.then((err) => {err;})

app.get("/", (req, res) =>{
    res.send('App is running');
})

const usersSeeder = require("./seedDatabase");
const router = require('./routes/routes');

app.use('/api/seed', usersSeeder);
app.use('/api', router);

app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT || 3000}`);
})
