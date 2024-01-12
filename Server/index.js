const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const usersSeeder = require("./seedDatabase");
const router = require('./routes/routes');

const app = express();
app.use(express.json())

dotenv.config();

const PORT = process.env.PORT;
const MONGO = process.env.MONGODB;

const corsOptions = {
    origin: 'http://localhost:3001', // for testing frontend
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose.connect(MONGO)
.then(() => console.log("Succesfully connected to DB"))
.then((err) => {err;})

app.get("/", (req, res) =>{
    res.send('App is running');
})

app.use('/api/seed', usersSeeder);
app.use('/api', router);

app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT || 3000}`);
})
